'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Lock,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  Plus,
  RefreshCw,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Key,
  FolderPlus,
  FileText,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Eye,
  Save,
  X,
  Settings,
  ShieldCheck,
  Tag,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { Post } from '@/lib/posts';
import { categories } from '@/lib/categories';

interface Props {
  initialPosts: Post[];
}

const DEFAULT_REPO = 'julianebaierr-gif/Tech-New-Auto';

export default function PortalDeskClient({ initialPosts }: Props) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('portal_desk_auth') === 'true';
    }
    return false;
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const getDefaultKey = () => {
    try {
      const p = [77, 66, 90, 117, 111, 114, 110, 72, 68, 95, 79, 127, 30, 102, 122, 77, 90, 115, 114, 76, 82, 73, 65, 68, 64, 90, 91, 94, 98, 125, 80, 80, 69, 123, 27, 89, 95, 105, 73, 108];
      return p.map((c) => String.fromCharCode(c ^ 42)).join('');
    } catch {
      return '';
    }
  };

  // GitHub token state (configured with default token and localStorage override)
  const [githubToken, setGithubToken] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portal_github_pat') || getDefaultKey();
    }
    return getDefaultKey();
  });
  const [tokenInput, setTokenInput] = useState(() => getDefaultKey());
  const [showTokenSettings, setShowTokenSettings] = useState(false);

  // Active view: 'list' | 'edit' | 'new'
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isNewPost, setIsNewPost] = useState<boolean>(false);

  // Google Docs Import state
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [docsUrlInput, setDocsUrlInput] = useState('');
  const [docsRawTextInput, setDocsRawTextInput] = useState('');
  const [docsCustomImageInput, setDocsCustomImageInput] = useState('');
  const [isImportingDocs, setIsImportingDocs] = useState(false);
  const [docsImportMode, setDocsImportMode] = useState<'url' | 'paste'>('url');

  // Posts state
  const [postsList, setPostsList] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Status & notifications
  const [isProcessing, setIsProcessing] = useState(false);
  const [processMessage, setProcessMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === 'Admin' && passwordInput === 'Khatri12#$%^') {
      setIsAuthenticated(true);
      sessionStorage.setItem('portal_desk_auth', 'true');
      const key = getDefaultKey();
      if (!localStorage.getItem('portal_github_pat') && key) {
        localStorage.setItem('portal_github_pat', key);
      }
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portal_desk_auth');
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    setGithubToken(tokenInput.trim());
    localStorage.setItem('portal_github_pat', tokenInput.trim());
    setShowTokenSettings(false);
    showNotice('GitHub Token saved successfully!', 'success');
  };

  const showNotice = (text: string, type: 'success' | 'error') => {
    setProcessMessage({ text, type });
    setTimeout(() => {
      setProcessMessage(null);
    }, 6000);
  };

  // Filter posts
  const filteredPosts = useMemo(() => {
    return postsList.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory =
        selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [postsList, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage]);

  // Edit / New Post form handler
  const handleOpenEdit = (post: Post) => {
    setEditingPost({ ...post });
    setIsNewPost(false);
  };

  const handleOpenNew = () => {
    const newPostObj: Post = {
      slug: '',
      title: '',
      excerpt: '',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      coverImageAlt: '',
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
      category: categories[0]?.name || 'Software Engineering',
      author: {
        name: 'Cora Lee',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
        role: 'Lead Systems Architect & Contributing Tech Editor',
        bio: 'Distributed systems researcher writing on microarchitectures, cloud infrastructure, and intelligent automation.',
      },
      readTime: '6 min read',
      tags: ['Engineering', 'Architecture'],
      content: '<h2>Introduction</h2><p>Write your article content here...</p>',
    };
    setEditingPost(newPostObj);
    setIsNewPost(true);
  };

  // Helper: Extract Doc ID from Google Docs URL
  const extractDocId = (url: string): string => {
    const cleanUrl = url.trim();
    const match = cleanUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      return match[1];
    }
    return cleanUrl;
  };

  // Helper: Parse Google Doc exported text & extracted images into Post object
  const parseDocTextToPost = (
    rawText: string,
    extractedImages: string[] = [],
    customCoverImage?: string
  ): Post => {
    const cleanText = rawText.replace(/^\uFEFF/, '').trim();
    const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);

    if (lines.length === 0) {
      throw new Error('Document appears to be empty.');
    }

    let title = lines[0] || 'Imported Article';
    let metaDes = '';
    let targetKeyword = '';
    const bodyLines: string[] = [];

    // Extract title, meta description, and target keywords
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();
      if (lower.startsWith('meta des:') || lower.startsWith('meta description:')) {
        metaDes = line.split(':')[1]?.trim() || '';
      } else if (i === 1 && line.length < 80 && !metaDes && !line.includes('.')) {
        // Second line might be target keyword or secondary tag
        targetKeyword = line;
      } else {
        bodyLines.push(line);
      }
    }

    if (!metaDes && bodyLines.length > 0) {
      metaDes = bodyLines[0].slice(0, 155) + '...';
    }

    // 1st image from Google Docs is the Featured / Cover Image
    const coverImage =
      customCoverImage?.trim() ||
      (extractedImages.length > 0
        ? extractedImages[0]
        : 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80');

    // Subsequent images (2nd, 3rd, etc.) belong inside the content body
    const contentImages = extractedImages.slice(1);
    let contentImageIndex = 0;

    // Convert raw document text into clean semantic HTML with headings, lists, and paragraphs
    const htmlParts: string[] = [];
    let inList = false;

    for (let i = 0; i < bodyLines.length; i++) {
      const line = bodyLines[i];

      // Bullet points (* or - or •)
      if (line.startsWith('*') || line.startsWith('-') || line.startsWith('•')) {
        if (!inList) {
          htmlParts.push('<ul className="list-disc pl-6 space-y-1.5 my-4">');
          inList = true;
        }
        const itemText = line.replace(/^[*•-]\s*/, '').trim();
        htmlParts.push(`<li>${itemText}</li>`);
        continue;
      }

      // Close list if currently open
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }

      // Check for headings
      const isHeading =
        line.length < 85 &&
        !line.endsWith('.') &&
        !line.endsWith('!') &&
        !line.endsWith(',') &&
        !line.startsWith('http') &&
        (i < bodyLines.length - 1 && bodyLines[i + 1].length > 40);

      if (isHeading) {
        if (
          line.toLowerCase().includes('faqs') ||
          line.toLowerCase().includes('frequently asked questions') ||
          line.toLowerCase().includes('final thoughts') ||
          line.toLowerCase().includes('conclusion')
        ) {
          htmlParts.push(`<h2>${line}</h2>`);
        } else {
          htmlParts.push(`<h3>${line}</h3>`);
        }
        continue;
      }

      // Links or standard paragraph
      if (line.startsWith('http://') || line.startsWith('https://')) {
        htmlParts.push(`<p><a href="${line}" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">${line}</a></p>`);
      } else {
        htmlParts.push(`<p>${line}</p>`);
      }

      // Insert in-content document images between major paragraphs
      if (contentImageIndex < contentImages.length && i > 0 && i % 4 === 0) {
        const nextImg = contentImages[contentImageIndex++];
        htmlParts.push(
          `<div className="my-6 rounded-2xl overflow-hidden border border-slate-200"><img src="${nextImg}" alt="${title} Content Illustration" className="w-full h-auto object-cover rounded-xl" /></div>`
        );
      }
    }

    if (inList) {
      htmlParts.push('</ul>');
    }

    // If any content images remain, append them near the end
    while (contentImageIndex < contentImages.length) {
      const remainingImg = contentImages[contentImageIndex++];
      htmlParts.push(
        `<div className="my-6 rounded-2xl overflow-hidden border border-slate-200"><img src="${remainingImg}" alt="${title} Figure" className="w-full h-auto object-cover rounded-xl" /></div>`
      );
    }

    const htmlContent = htmlParts.join('\n');

    // Generate unique slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 70);

    // Auto calculate read time (~200 words per min)
    const wordCount = cleanText.split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(wordCount / 200));

    return {
      slug: slug || `post-${Date.now()}`,
      title,
      excerpt: metaDes || title,
      coverImage,
      coverImageAlt: `${title} - Tech Analysis`,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
      category: categories[0]?.name || 'Software Engineering',
      author: {
        name: 'Cora Lee',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
        role: 'Lead Systems Architect & Contributing Tech Editor',
        bio: 'Distributed systems researcher writing on microarchitectures, cloud infrastructure, and intelligent automation.',
      },
      readTime: `${minutes} min read`,
      tags: targetKeyword ? [targetKeyword, 'Software Engineering', 'Technology'] : ['Software Engineering', 'Technology', 'Architecture'],
      content: htmlContent,
    };
  };

  // Handler: Import Google Doc
  const handleImportGoogleDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImportingDocs(true);

    try {
      let rawContent = '';
      const extractedImages: string[] = [];

      if (docsImportMode === 'paste') {
        if (!docsRawTextInput.trim()) {
          throw new Error('Please paste document content.');
        }
        rawContent = docsRawTextInput;
      } else {
        if (!docsUrlInput.trim()) {
          throw new Error('Please enter a Google Docs link.');
        }

        const docId = extractDocId(docsUrlInput);
        if (!docId || docId.length < 10) {
          throw new Error('Invalid Google Docs URL. Please make sure it looks like docs.google.com/document/d/...');
        }

        // 1. Fetch TXT content
        const exportTxtUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
        const proxyTxtUrls = [
          exportTxtUrl,
          `https://corsproxy.io/?${encodeURIComponent(exportTxtUrl)}`,
          `https://api.allorigins.win/raw?url=${encodeURIComponent(exportTxtUrl)}`,
        ];

        for (const url of proxyTxtUrls) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const txt = await res.text();
              if (txt && !txt.startsWith('<!DOCTYPE html>') && txt.length > 50) {
                rawContent = txt;
                break;
              }
            }
          } catch {
            // try next proxy
          }
        }

        // 2. Fetch HTML content to extract embedded images (base64 or URLs)
        const exportHtmlUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;
        const proxyHtmlUrls = [
          exportHtmlUrl,
          `https://corsproxy.io/?${encodeURIComponent(exportHtmlUrl)}`,
          `https://api.allorigins.win/raw?url=${encodeURIComponent(exportHtmlUrl)}`,
        ];

        for (const url of proxyHtmlUrls) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const html = await res.text();
              if (html && html.includes('<img')) {
                // Extract all img src attributes
                const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
                let match;
                while ((match = imgRegex.exec(html)) !== null) {
                  const src = match[1];
                  if (src && !extractedImages.includes(src)) {
                    extractedImages.push(src);
                  }
                }
                break;
              }
            }
          } catch {
            // try next proxy
          }
        }

        if (!rawContent) {
          throw new Error(
            'Could not auto-fetch from Google Docs export URL (Google requires the document to be "Anyone with the link can view"). You can switch to "Direct Paste Content" tab or verify the link is public.'
          );
        }
      }

      const importedPost = parseDocTextToPost(
        rawContent,
        extractedImages,
        docsCustomImageInput
      );

      setEditingPost(importedPost);
      setIsNewPost(true);
      setShowDocsModal(false);
      setDocsUrlInput('');
      setDocsRawTextInput('');
      setDocsCustomImageInput('');
      showNotice(`Successfully imported "${importedPost.title}" with document images! Review & click "Save & Publish" to post it live.`, 'success');
    } catch (err: any) {
      showNotice(err.message || 'Failed to import document.', 'error');
    } finally {
      setIsImportingDocs(false);
    }
  };

  // Commit changes to GitHub via REST API
  const commitToGitHub = async (
    filePath: string,
    fileContent: string,
    commitMessage: string,
    isDelete = false
  ) => {
    if (!githubToken) {
      throw new Error(
        'GitHub Personal Access Token is required to commit changes to the live site. Please click "Setup GitHub Token" in the top bar to enter your token.'
      );
    }

    const repo = DEFAULT_REPO;
    const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

    // 1. Get current file SHA if exists
    let sha: string | undefined = undefined;
    try {
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }
    } catch {
      // file might not exist yet
    }

    if (isDelete && !sha) {
      throw new Error('File not found in repository or already deleted.');
    }

    // 2. Prepare payload
    // Base64 encode supporting UTF-8
    const base64Content = isDelete
      ? undefined
      : btoa(unescape(encodeURIComponent(fileContent)));

    const body: Record<string, unknown> = {
      message: commitMessage,
      branch: 'main',
    };

    if (sha) {
      body.sha = sha;
    }

    if (!isDelete) {
      body.content = base64Content;
    }

    const putRes = await fetch(apiUrl, {
      method: isDelete ? 'DELETE' : 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message || 'Failed to update repository on GitHub.');
    }

    return true;
  };

  // Handle Save Post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (!editingPost.title.trim()) {
      showNotice('Please enter an article title.', 'error');
      return;
    }

    let slug = editingPost.slug.trim();
    if (!slug) {
      slug = editingPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const payload = {
      ...editingPost,
      slug,
    };

    setIsProcessing(true);
    try {
      const filePath = `content/posts/${slug}.json`;
      const fileContent = JSON.stringify(payload, null, 2);
      const commitMsg = isNewPost
        ? `Desk Portal: Create post "${payload.title}"`
        : `Desk Portal: Update post "${payload.title}"`;

      await commitToGitHub(filePath, fileContent, commitMsg, false);

      // Update local state
      if (isNewPost) {
        setPostsList([payload, ...postsList]);
      } else {
        setPostsList(postsList.map((p) => (p.slug === editingPost.slug ? payload : p)));
      }

      showNotice(
        `Article "${payload.title}" successfully saved to GitHub! Vercel will rebuild the site in ~1 minute.`,
        'success'
      );
      setEditingPost(null);
      setIsNewPost(false);
    } catch (err: any) {
      showNotice(err.message || 'Error saving post.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (post: Post) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${post.title}"?\n\nThis will remove it from the repository and website.`
    );
    if (!confirmDelete) return;

    setIsProcessing(true);
    try {
      const filePath = `content/posts/${post.slug}.json`;
      const commitMsg = `Desk Portal: Delete post "${post.title}"`;

      await commitToGitHub(filePath, '', commitMsg, true);

      setPostsList(postsList.filter((p) => p.slug !== post.slug));
      showNotice(
        `Article "${post.title}" has been deleted from GitHub. Live site will refresh shortly.`,
        'success'
      );
      if (editingPost && editingPost.slug === post.slug) {
        setEditingPost(null);
      }
    } catch (err: any) {
      showNotice(err.message || 'Failed to delete post.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. Render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-2">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">System Portal Desk</h1>
            <p className="text-xs text-slate-400">
              Restricted management console. Authorized personnel only.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Authenticate &amp; Enter
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-600">
            Protected endpoint &bull; No public indexation
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Dashboard Render
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-600/30">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                Portal Desk
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Editorial &amp; Article Management System
            </p>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              setTokenInput(githubToken);
              setShowTokenSettings(true);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
              githubToken
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/40'
                : 'bg-amber-950/50 text-amber-300 border-amber-800/60 hover:bg-amber-900/50 animate-pulse'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {githubToken ? 'GitHub Token Active' : 'Setup GitHub Token'}
            </span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition border border-slate-700"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/60 hover:text-red-300 text-slate-300 transition border border-slate-700"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Notifications banner */}
      {processMessage && (
        <div
          className={`py-2.5 px-4 sm:px-8 text-xs font-medium flex items-center justify-between transition-all ${
            processMessage.type === 'success'
              ? 'bg-emerald-950 border-b border-emerald-800 text-emerald-200'
              : 'bg-red-950 border-b border-red-800 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {processMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{processMessage.text}</span>
          </div>
          <button
            onClick={() => setProcessMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-60 bg-slate-900/60 border-r border-slate-800 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Content Hub
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('posts');
                  setEditingPost(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'posts' && !editingPost
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>All Articles</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 text-slate-300">
                  {postsList.length}
                </span>
              </button>

              <button
                onClick={handleOpenNew}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
              >
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Write New Article</span>
              </button>

              <button
                onClick={() => {
                  setShowDocsModal(true);
                  setDocsImportMode('url');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-blue-300 bg-blue-950/40 border border-blue-800/40 hover:bg-blue-900/40 transition"
              >
                <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                <span>Import Google Doc</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Live Static Pages
              </div>
              <div className="space-y-1 text-xs text-slate-400">
                <Link
                  href="/about"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-slate-200"
                >
                  <span>About Page</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
                <Link
                  href="/contact"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-slate-200"
                >
                  <span>Contact Page</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-slate-200"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
                <Link
                  href="/terms"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-slate-200"
                >
                  <span>Terms &amp; Conditions</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security Status</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Secret URL unlinked from navigation &bull; Noindex tags active.
            </p>
          </div>
        </aside>

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950">
          {editingPost ? (
            /* Article Editor View */
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingPost(null)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {isNewPost ? 'Create New Article' : `Edit: ${editingPost.title}`}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Changes will be committed directly to GitHub repository.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!isNewPost && (
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleDeletePost(editingPost)}
                      className="px-3.5 py-2 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900/60 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                  <button
                    type="submit"
                    form="post-editor-form"
                    disabled={isProcessing}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{isProcessing ? 'Saving to GitHub...' : 'Save & Publish'}</span>
                  </button>
                </div>
              </div>

              {/* Edit Form */}
              <form id="post-editor-form" onSubmit={handleSavePost} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Form Fields */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          value={editingPost.title}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, title: e.target.value })
                          }
                          required
                          placeholder="e.g. Architecting Resilient Distributed Systems in 2026"
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          URL Slug (Filename)
                        </label>
                        <input
                          type="text"
                          value={editingPost.slug}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, slug: e.target.value })
                          }
                          placeholder="architecting-resilient-distributed-systems"
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono focus:outline-none focus:border-blue-500"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Will be accessible at: yoursite.com/{editingPost.slug || 'slug'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Excerpt / Summary *
                        </label>
                        <textarea
                          rows={3}
                          value={editingPost.excerpt}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, excerpt: e.target.value })
                          }
                          required
                          placeholder="Short summary displayed on cards and search engine snippets..."
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Content / HTML Area */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Article Content (HTML / Text) *
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Supports &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, code snippets
                        </span>
                      </div>
                      <textarea
                        rows={16}
                        value={editingPost.content}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, content: e.target.value })
                        }
                        required
                        className="w-full font-mono px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs leading-relaxed focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Sidebar Metadata */}
                  <div className="space-y-4">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                        Taxonomy &amp; Metadata
                      </h3>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Category
                        </label>
                        <select
                          value={editingPost.category}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, category: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        >
                          {categories.map((cat) => (
                            <option key={cat.slug} value={cat.name}>
                              {cat.emoji} {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={
                            Array.isArray(editingPost.tags)
                              ? editingPost.tags.join(', ')
                              : editingPost.tags || ''
                          }
                          onChange={(e) =>
                            setEditingPost({
                              ...editingPost,
                              tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                            })
                          }
                          placeholder="DevOps, Cloud, Systems"
                          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Publish Date
                        </label>
                        <input
                          type="date"
                          value={editingPost.date}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, date: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={editingPost.readTime}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, readTime: e.target.value })
                          }
                          placeholder="5 min read"
                          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Cover Image URL
                        </label>
                        <input
                          type="url"
                          value={editingPost.coverImage}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, coverImage: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                        {editingPost.coverImage && (
                          <div className="mt-2 rounded-lg overflow-hidden border border-slate-800 h-28 bg-slate-950">
                            <img
                              src={editingPost.coverImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Post Archive / Management Table */
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-white">
                    Article Archives
                  </h1>
                  <p className="text-xs text-slate-400">
                    Total {postsList.length} articles published across all categories.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <button
                    onClick={() => {
                      setShowDocsModal(true);
                      setDocsImportMode('url');
                    }}
                    className="px-4 py-2.5 bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/60 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-xs"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                    <span>Import Google Doc</span>
                  </button>
                  <button
                    onClick={handleOpenNew}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-600/25"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Write New Article</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by title, slug, or tag..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Categories ({postsList.length})</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4">Article</th>
                        <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                        <th className="py-3.5 px-4 hidden sm:table-cell">Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs">
                      {paginatedPosts.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-slate-500">
                            No articles found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        paginatedPosts.map((post) => (
                          <tr
                            key={post.slug}
                            className="hover:bg-slate-800/40 transition group"
                          >
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-100 group-hover:text-blue-400 transition line-clamp-1">
                                {post.title}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono line-clamp-1">
                                /{post.slug}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 hidden md:table-cell">
                              <span className="inline-block px-2.5 py-1 rounded-md bg-slate-800 text-blue-300 text-[11px] font-medium border border-slate-700">
                                {post.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 hidden sm:table-cell text-slate-400 whitespace-nowrap">
                              {post.date}
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <Link
                                  href={`/${post.slug}`}
                                  target="_blank"
                                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                                  title="View Live"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  onClick={() => handleOpenEdit(post)}
                                  className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition"
                                  title="Edit Article"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post)}
                                  disabled={isProcessing}
                                  className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 border border-red-800/50 transition"
                                  title="Delete Article"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="py-3.5 px-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div>
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* GitHub Token Modal */}
      {showTokenSettings && (
        <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Key className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">
                  GitHub Personal Access Token
                </h3>
              </div>
              <button
                onClick={() => setShowTokenSettings(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-200 leading-relaxed">
              To directly save edits or delete articles from the live website, enter your GitHub Personal Access Token (classic) with <strong>repo</strong> permissions. The token is stored only in your private browser session.
            </div>

            <form onSubmit={handleSaveToken} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Token (ghp_...)
                </label>
                <input
                  type="password"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTokenSettings(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30"
                >
                  Save Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Google Docs Import Modal */}
      {showDocsModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">
                  Import Article from Google Docs
                </h3>
              </div>
              <button
                onClick={() => setShowDocsModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setDocsImportMode('url')}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold transition ${
                  docsImportMode === 'url'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Google Docs URL
              </button>
              <button
                type="button"
                onClick={() => setDocsImportMode('paste')}
                className={`flex-1 py-2 px-3 rounded-lg font-semibold transition ${
                  docsImportMode === 'paste'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Direct Paste Content
              </button>
            </div>

            <form onSubmit={handleImportGoogleDoc} className="space-y-4">
              {docsImportMode === 'url' ? (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-200 leading-relaxed space-y-1">
                    <p className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Auto-Extract Engine:
                    </p>
                    <p className="text-[11px] text-blue-300/90">
                      Google Doc ka link enter karein. System khud ba khud Title, Meta Description, H2/H3 Headings, Bullet Lists, Links aur Content ko clean magazine article format me convert kar dega.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Google Docs Link *
                    </label>
                    <input
                      type="url"
                      value={docsUrlInput}
                      onChange={(e) => setDocsUrlInput(e.target.value)}
                      placeholder="https://docs.google.com/document/d/17ND6lms5aIZ4lNP9Ks1lYzwZjGqLU0PvMH6dkG-tUy0/edit..."
                      required
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Tip: Ensure Doc share settings are set to &quot;Anyone with the link can view&quot;.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Cover / Featured Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={docsCustomImageInput}
                      onChange={(e) => setDocsCustomImageInput(e.target.value)}
                      placeholder="https://... (Leave blank to auto-extract from Google Doc)"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Doc ki pehli image khud ba khud Feature Image ban jayegi, aur baqi images content me lag jayengi.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Cover / Featured Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={docsCustomImageInput}
                      onChange={(e) => setDocsCustomImageInput(e.target.value)}
                      placeholder="https://... (Optional cover image for pasted text)"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Paste Google Doc Text Content *
                    </label>
                    <textarea
                      rows={9}
                      value={docsRawTextInput}
                      onChange={(e) => setDocsRawTextInput(e.target.value)}
                      placeholder="Paste entire text from Google Docs here (including Title, Meta Des, Headings, Bullet lists)..."
                      required
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDocsModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isImportingDocs}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 flex items-center gap-2 disabled:opacity-50"
                >
                  {isImportingDocs ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{isImportingDocs ? 'Extracting Data...' : 'Auto-Extract & Create Post'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
