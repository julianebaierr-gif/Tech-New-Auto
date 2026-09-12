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
  FileSpreadsheet,
  CheckSquare,
  Square
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
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // Google Docs Import state
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [docsUrlInput, setDocsUrlInput] = useState('');
  const [docsRawTextInput, setDocsRawTextInput] = useState('');
  const [docsCustomImageInput, setDocsCustomImageInput] = useState('');
  const [isImportingDocs, setIsImportingDocs] = useState(false);
  const [docsImportMode, setDocsImportMode] = useState<'url' | 'paste'>('url');

  // Posts state
  const [postsList, setPostsList] = useState<Post[]>(initialPosts);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
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
  // Helper: Clean Google redirect link (https://www.google.com/url?q=...)
  const cleanGoogleRedirectUrl = (url: string): string => {
    if (!url) return '';
    const match = url.match(/google\.com\/url\?q=([^&]+)/);
    if (match) {
      try {
        return decodeURIComponent(match[1]);
      } catch {
        return match[1];
      }
    }
    return url.replace(/&amp;/g, '&');
  };

  // Helper: Parse Google Doc exported HTML or plain text into Post object
  const parseGoogleDocToPost = (
    rawHtml: string,
    rawTxt: string,
    extractedImages: string[] = [],
    customCoverImage?: string
  ): Post => {
    let title = '';
    let seoTitle = '';
    let metaDes = '';
    let targetKeyword = '';
    let htmlContent = '';
    const contentImages = extractedImages.slice(1);
    let contentImageIdx = 0;

    // PATH 1: Rich HTML Parser (Preserves exact <a> hyperlinks, formatting, headings, bullet points)
    if (rawHtml && (rawHtml.includes('<body') || rawHtml.includes('<p') || rawHtml.includes('<h1'))) {
      // Clean all Google redirect URLs and style hyperlinks
      const processedHtml = rawHtml.replace(
        /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
        (_match, href, text) => {
          const realUrl = cleanGoogleRedirectUrl(href);
          return `<a href="${realUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium hover:text-blue-800">${text}</a>`;
        }
      );

      // 1. Detect SEO Title: e.g. "SEO Title" followed by paragraph, or "SEO Title: ..."
      const seoMatch =
        processedHtml.match(/<p[^>]*>\s*SEO\s*Title\s*:?\s*<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/i) ||
        processedHtml.match(/SEO\s*Title\s*:\s*([^\n<]+)/i);
      if (seoMatch) {
        seoTitle = seoMatch[1].replace(/<[^>]+>/g, '').trim();
      }

      // 2. Detect Meta Description: e.g. "Meta Description:" or "Meta Des:"
      const metaMatch =
        processedHtml.match(/<p[^>]*>\s*Meta\s*Des(?:cription)?\s*:?\s*<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/i) ||
        processedHtml.match(/Meta\s*Des(?:cription)?\s*:\s*([^\n<]+)/i);
      if (metaMatch) {
        metaDes = metaMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
      }

      // 3. Detect Title (H1 tag or Title label or Title tag)
      const h1Match = processedHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) {
        title = h1Match[1].replace(/<[^>]+>/g, '').trim();
      }

      if (!title) {
        const titleLabelMatch =
          processedHtml.match(/<p[^>]*>\s*Title\s*:?\s*<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/i) ||
          processedHtml.match(/(?:^|>)\s*Title\s*:\s*([^\n<]+)/i);
        if (titleLabelMatch) {
          title = titleLabelMatch[1].replace(/<[^>]+>/g, '').trim();
        }
      }

      // 4. Parse content elements (<p>, <h2>, <h3>, <h4>, <ul>, <ol>)
      const contentParts: string[] = [];
      const blockRegex = /<(h[2-6]|p|ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi;
      let b;
      let paragraphCount = 0;

      while ((b = blockRegex.exec(processedHtml)) !== null) {
        const tag = b[1].toLowerCase();
        const inner = b[2].trim();
        const textOnly = inner.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();

        if (!textOnly && !inner.includes('<img') && !inner.includes('<a')) {
          continue; // Skip empty blocks
        }

        // Filter out metadata paragraphs so they don't leak into body text
        const lowerText = textOnly.toLowerCase();
        if (
          lowerText === 'seo title' ||
          lowerText.startsWith('seo title:') ||
          lowerText === 'meta des' ||
          lowerText.startsWith('meta des:') ||
          lowerText === 'meta description' ||
          lowerText.startsWith('meta description:') ||
          (seoTitle && textOnly === seoTitle) ||
          (metaDes && textOnly === metaDes) ||
          (title && textOnly === title && tag.startsWith('h'))
        ) {
          continue;
        }

        if (tag.startsWith('h')) {
          contentParts.push(`<${tag}>${inner}</${tag}>`);
        } else if (tag === 'ul' || tag === 'ol') {
          contentParts.push(`<${tag} class="list-disc pl-6 space-y-1.5 my-4">${inner}</${tag}>`);
        } else {
          contentParts.push(`<p>${inner}</p>`);
          paragraphCount++;

          // Insert in-content document images between major paragraphs
          if (contentImageIdx < contentImages.length && paragraphCount % 4 === 0) {
            const nextImg = contentImages[contentImageIdx++];
            contentParts.push(
              `<div class="my-6 rounded-2xl overflow-hidden border border-slate-200"><img src="${nextImg}" alt="${title || 'Article'} Content Illustration" class="w-full h-auto object-cover rounded-xl" /></div>`
            );
          }
        }
      }

      // Append any remaining content images
      while (contentImageIdx < contentImages.length) {
        const remainingImg = contentImages[contentImageIdx++];
        contentParts.push(
          `<div class="my-6 rounded-2xl overflow-hidden border border-slate-200"><img src="${remainingImg}" alt="${title || 'Article'} Figure" class="w-full h-auto object-cover rounded-xl" /></div>`
        );
      }

      htmlContent = contentParts.join('\n');
    }

    // PATH 2: Fallback Plain Text Parser (if HTML is not available or Direct Paste used)
    if (!htmlContent && rawTxt) {
      const cleanText = rawTxt.replace(/^\uFEFF/, '').trim();
      const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);

      let skipNextLineForTitle = false;
      let skipNextLineForSeoTitle = false;
      let skipNextLineForMeta = false;
      const bodyLines: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lower = line.toLowerCase();

        if (skipNextLineForTitle) {
          if (!title) title = line;
          skipNextLineForTitle = false;
          continue;
        }
        if (skipNextLineForSeoTitle) {
          if (!seoTitle) seoTitle = line;
          skipNextLineForSeoTitle = false;
          continue;
        }
        if (skipNextLineForMeta) {
          if (!metaDes) metaDes = line;
          skipNextLineForMeta = false;
          continue;
        }

        // SEO Title pattern
        if (lower === 'seo title' || lower === 'seo title:' || lower === 'seo-title' || lower === 'seo-title:') {
          if (i + 1 < lines.length) {
            seoTitle = lines[i + 1];
            skipNextLineForSeoTitle = true;
          }
          continue;
        }
        if (lower.startsWith('seo title:') || lower.startsWith('seo-title:')) {
          seoTitle = line.split(':')[1]?.trim() || '';
          continue;
        }

        // H1 / Title label pattern
        if (
          lower === 'title' ||
          lower === 'title:' ||
          lower === 'h1' ||
          lower === 'h1:' ||
          lower === 'heading 1' ||
          lower === 'heading 1:'
        ) {
          if (i + 1 < lines.length) {
            title = lines[i + 1];
            skipNextLineForTitle = true;
          }
          continue;
        }
        if (lower.startsWith('title:') || lower.startsWith('h1:') || lower.startsWith('heading 1:')) {
          title = line.split(':')[1]?.trim() || '';
          continue;
        }

        // Meta Description pattern
        if (
          lower === 'meta des' ||
          lower === 'meta des:' ||
          lower === 'meta description' ||
          lower === 'meta description:'
        ) {
          if (i + 1 < lines.length) {
            metaDes = lines[i + 1];
            skipNextLineForMeta = true;
          }
          continue;
        }
        if (lower.startsWith('meta des:') || lower.startsWith('meta description:') || lower.startsWith('meta:')) {
          metaDes = line.split(':')[1]?.trim() || '';
          continue;
        }

        bodyLines.push(line);
      }

      // If no explicit H1 was found, first line of body is the H1 article title
      if (!title && bodyLines.length > 0) {
        title = bodyLines.shift() || 'Imported Article';
      }

      // Build HTML from plain text
      const htmlParts: string[] = [];
      let inList = false;

      for (let i = 0; i < bodyLines.length; i++) {
        const line = bodyLines[i];

        if (line.startsWith('*') || line.startsWith('-') || line.startsWith('•')) {
          if (!inList) {
            htmlParts.push('<ul class="list-disc pl-6 space-y-1.5 my-4">');
            inList = true;
          }
          const itemText = line.replace(/^[*•-]\s*/, '').trim();
          htmlParts.push(`<li>${itemText}</li>`);
          continue;
        }

        if (inList) {
          htmlParts.push('</ul>');
          inList = false;
        }

        const isHeading =
          line.length < 90 &&
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

        // Detect hyperlinks or standard paragraph
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        if (linkRegex.test(line)) {
          const linkedLine = line.replace(
            linkRegex,
            (url) => `<a href="${cleanGoogleRedirectUrl(url)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium hover:text-blue-800">${url}</a>`
          );
          htmlParts.push(`<p>${linkedLine}</p>`);
        } else {
          htmlParts.push(`<p>${line}</p>`);
        }

        if (contentImageIdx < contentImages.length && i > 0 && i % 4 === 0) {
          const nextImg = contentImages[contentImageIdx++];
          htmlParts.push(
            `<div class="my-6 rounded-2xl overflow-hidden border border-slate-200"><img src="${nextImg}" alt="${title} Content Illustration" class="w-full h-auto object-cover rounded-xl" /></div>`
          );
        }
      }

      if (inList) {
        htmlParts.push('</ul>');
      }

      while (contentImageIdx < contentImages.length) {
        const remainingImg = contentImages[contentImageIdx++];
        htmlParts.push(
          `<div class="my-6 rounded-2xl overflow-hidden border border-slate-200"><img src="${remainingImg}" alt="${title} Figure" class="w-full h-auto object-cover rounded-xl" /></div>`
        );
      }

      htmlContent = htmlParts.join('\n');
    }

    // 1st image from Google Docs is the Featured / Cover Image
    const coverImage =
      customCoverImage?.trim() ||
      (extractedImages.length > 0
        ? extractedImages[0]
        : 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80');

    // Default title fallback
    if (!title) {
      title = seoTitle || 'Imported Article';
    }

    // Default meta description fallback
    if (!metaDes) {
      metaDes = title;
    }

    // Slug: USER REQUIREMENT -> "or seo title jo likha hai wo slug me, smjy?"
    // If SEO Title exists, slug is formed from SEO Title; otherwise falls back to H1 title
    const slugSource = (seoTitle || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 70);

    // Auto calculate read time (~200 words per min)
    const plainTextAll = (rawTxt || htmlContent.replace(/<[^>]+>/g, ' ')).trim();
    const wordCount = plainTextAll.split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(wordCount / 200));

    return {
      slug: slugSource || `post-${Date.now()}`,
      title,
      excerpt: metaDes,
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
      tags: targetKeyword
        ? [targetKeyword, 'Software Engineering', 'Technology']
        : ['Software Engineering', 'Technology', 'Architecture'],
      content: htmlContent || '<p>Article content could not be rendered.</p>',
    };
  };

  // Handler: Import Google Doc
  const handleImportGoogleDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImportingDocs(true);

    try {
      let rawContent = '';
      let rawHtml = '';
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

        // 1. Fetch HTML content (Contains full hyperlinks, headings structure, and embedded images)
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
              if (html && html.length > 50) {
                rawHtml = html;

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

        // 2. Fetch TXT content as auxiliary fallback
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

        if (!rawHtml && !rawContent) {
          throw new Error(
            'Could not auto-fetch from Google Docs export URL (Google requires the document to be "Anyone with the link can view"). You can switch to "Direct Paste Content" tab or verify the link is public.'
          );
        }
      }

      const importedPost = parseGoogleDocToPost(
        rawHtml,
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
      showNotice(
        `Successfully imported "${importedPost.title}"! Title set from H1, Slug generated from SEO Title, hyperlinks & images preserved. Review & click "Save & Publish".`,
        'success'
      );
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
      setSelectedSlugs((prev) => prev.filter((s) => s !== post.slug));
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

  // Selection handlers
  const handleToggleSelectOne = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleToggleSelectPage = () => {
    const pageSlugs = paginatedPosts.map((p) => p.slug);
    const allPageSelected = pageSlugs.every((s) => selectedSlugs.includes(s));
    if (allPageSelected) {
      setSelectedSlugs((prev) => prev.filter((s) => !pageSlugs.includes(s)));
    } else {
      setSelectedSlugs((prev) => Array.from(new Set([...prev, ...pageSlugs])));
    }
  };

  const handleSelectAllFiltered = () => {
    const allFilteredSlugs = filteredPosts.map((p) => p.slug);
    setSelectedSlugs(allFilteredSlugs);
  };

  const handleClearSelection = () => {
    setSelectedSlugs([]);
  };

  // Bulk delete handler
  const handleBulkDelete = async () => {
    if (selectedSlugs.length === 0) return;

    const confirmDelete = window.confirm(
      `⚠️ PERMANENT BULK DELETE WARNING:\n\nAre you sure you want to permanently delete all ${selectedSlugs.length} selected articles?\n\nThis will remove them from GitHub and the website.`
    );
    if (!confirmDelete) return;

    setIsProcessing(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (const slug of selectedSlugs) {
        try {
          const filePath = `content/posts/${slug}.json`;
          const commitMsg = `Desk Portal: Bulk delete post "${slug}"`;
          await commitToGitHub(filePath, '', commitMsg, true);
          successCount++;
        } catch (e) {
          console.error(`Failed to delete ${slug}:`, e);
          failCount++;
        }
      }

      setPostsList((prev) => prev.filter((p) => !selectedSlugs.includes(p.slug)));
      if (editingPost && selectedSlugs.includes(editingPost.slug)) {
        setEditingPost(null);
      }
      setSelectedSlugs([]);

      if (failCount === 0) {
        showNotice(`Successfully deleted all ${successCount} articles!`, 'success');
      } else {
        showNotice(
          `Deleted ${successCount} articles. (${failCount} failed to delete)`,
          'error'
        );
      }
    } catch (err: any) {
      showNotice(err.message || 'Error during bulk deletion.', 'error');
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
                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-2 shadow-sm"
                    title="Live preview dekhein k article publish hone k bad kaisa lagega"
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span>Preview Article</span>
                  </button>

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

              {/* Bulk Actions Banner (when articles selected) */}
              {selectedSlugs.length > 0 && (
                <div className="p-3.5 px-5 bg-gradient-to-r from-red-950/80 via-slate-900 to-red-950/80 border border-red-800/60 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg animate-fade-in">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600/30 text-red-300 font-bold text-xs border border-red-500/40">
                      {selectedSlugs.length}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      <strong className="text-white">{selectedSlugs.length}</strong> article{selectedSlugs.length > 1 ? 's' : ''} selected
                    </span>
                    {selectedSlugs.length < filteredPosts.length && (
                      <button
                        onClick={handleSelectAllFiltered}
                        className="text-xs text-blue-400 hover:text-blue-300 underline font-medium ml-1"
                      >
                        Select all {filteredPosts.length} filtered articles
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearSelection}
                      disabled={isProcessing}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                    >
                      Deselect All
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      disabled={isProcessing}
                      className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-600/30 disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isProcessing ? 'Deleting...' : `Delete Selected (${selectedSlugs.length})`}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4 w-10">
                          <button
                            type="button"
                            onClick={handleToggleSelectPage}
                            className="text-slate-400 hover:text-white transition flex items-center"
                            title={
                              paginatedPosts.length > 0 &&
                              paginatedPosts.every((p) => selectedSlugs.includes(p.slug))
                                ? 'Deselect Page'
                                : 'Select Page'
                            }
                          >
                            {paginatedPosts.length > 0 &&
                            paginatedPosts.every((p) => selectedSlugs.includes(p.slug)) ? (
                              <CheckSquare className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                        </th>
                        <th className="py-3.5 px-4">Article</th>
                        <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                        <th className="py-3.5 px-4 hidden sm:table-cell">Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs">
                      {paginatedPosts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-slate-500">
                            No articles found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        paginatedPosts.map((post) => {
                          const isSelected = selectedSlugs.includes(post.slug);
                          return (
                            <tr
                              key={post.slug}
                              className={`hover:bg-slate-800/40 transition group ${
                                isSelected ? 'bg-blue-950/20' : ''
                              }`}
                            >
                              <td className="py-3.5 px-4 w-10">
                                <button
                                  type="button"
                                  onClick={() => handleToggleSelectOne(post.slug)}
                                  className="text-slate-400 hover:text-white transition flex items-center"
                                >
                                  {isSelected ? (
                                    <CheckSquare className="w-4 h-4 text-blue-400" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                  )}
                                </button>
                              </td>
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
                          );
                        })
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

      {/* Article Live Preview Modal */}
      {showPreviewModal && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 sm:py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Live Article Preview (Overview Before Publishing)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPreviewModal(false);
                    // trigger form submission
                    const form = document.getElementById('post-editor-form') as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish Directly</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Article Public Page Simulation */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-950">
              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold uppercase tracking-wider">
                  {editingPost.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {editingPost.date}
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-400">{editingPost.readTime || '5 min read'}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {editingPost.title || 'Untitled Article'}
              </h1>

              {/* Meta Description / Excerpt Box */}
              {editingPost.excerpt && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-sm italic leading-relaxed">
                  <span className="font-bold not-italic text-slate-400 mr-2 text-xs uppercase tracking-wider">
                    Meta Description / Excerpt:
                  </span>
                  {editingPost.excerpt}
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center gap-3.5 py-4 border-y border-slate-800/80">
                <img
                  src={editingPost.author?.avatar || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'}
                  alt={editingPost.author?.name || 'Author'}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {editingPost.author?.name || 'Editorial Team'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {editingPost.author?.role || 'Contributing Tech Editor'}
                  </p>
                </div>
              </div>

              {/* Featured Cover Image */}
              {editingPost.coverImage && (
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <img
                    src={editingPost.coverImage}
                    alt={editingPost.coverImageAlt || editingPost.title}
                    className="w-full h-auto max-h-[460px] object-cover"
                  />
                  <div className="p-2.5 bg-slate-900 text-center text-[11px] text-slate-500 font-mono">
                    Featured Image URL: {editingPost.coverImage.slice(0, 80)}...
                  </div>
                </div>
              )}

              {/* Rendered HTML Content */}
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-300 prose-img:rounded-2xl prose-img:border prose-img:border-slate-800">
                <div
                  dangerouslySetInnerHTML={{
                    __html: editingPost.content || '<p className="text-slate-500 italic">No content written yet.</p>',
                  }}
                />
              </div>

              {/* Tags & Slug Footer */}
              <div className="pt-6 border-t border-slate-800/80 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1">
                    Tags:
                  </span>
                  {(editingPost.tags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Slug (URL path): <span className="text-blue-400">/{editingPost.slug}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400">
                Agar sab theek lage to &quot;Close &amp; Save&quot; ya &quot;Publish Directly&quot; par click karein.
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
