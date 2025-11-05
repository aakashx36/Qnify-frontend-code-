import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Syntax Highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Material-UI Components
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Link,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';

// Icons
import { LuCopy, LuCheck } from "react-icons/lu";

// --- Reusable Code Block Component (for *real* code blocks) ---
const CodeBlock = ({ language, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // This is what you wanted: It copies the 'children' (description), not the heading.
    const codeToCopy = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(codeToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Box sx={{ my: 2, position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'grey.200',
          px: 2,
          py: 0.5,
        }}
      >
        <Typography variant="caption" sx={{ color: 'grey.700', fontWeight: 500 }}>
          {language}
        </Typography>
        <Tooltip title={isCopied ? 'Copied!' : 'Copy code'} placement="top">
          <IconButton size="small" onClick={handleCopy}>
            {isCopied ? (
              <LuCheck size={16} color="green" />
            ) : (
              <LuCopy size={16} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          fontSize: '0.875rem',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </Box>
  );
};
// ----------------------------------------

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  // This object maps Markdown elements to MUI components
  const components = {
    // 1. TIGHTER SPACING: Reduced bottom margin
    p({ children }) {
      return (
        <Typography variant="body1" sx={{ mb: 1.25, lineHeight: 1.6 }}>
          {children}
        </Typography>
      );
    },

    strong({ children }) {
      return <Box component="strong" sx={{ fontWeight: 'bold' }}>{children}</Box>;
    },
    
    em({ children }) {
      return <Box component="em" sx={{ fontStyle: 'italic' }}>{children}</Box>;
    },

    // 2. SMARTER CODE RENDERER:
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const lang = match ? match[1] : 'text';
      const codeString = String(children).trim();

      // This is the fix:
      // Check if it's a block, but is very short and has no newlines
      const isShortBlock = !inline && !codeString.includes('\n') && codeString.length < 50;

      // This is the style for `useState` or `useEffect`
      const inlineStyle = {
        bgcolor: 'grey.200',
        color: 'text.secondary',
        px: 1,
        py: 0.25,
        borderRadius: 1,
        fontSize: '0.85em',
        fontFamily: '"Fira Code", "Roboto Mono", monospace',
        fontWeight: 500,
        wordBreak: 'break-all',
      };

      // If it's inline OR a short block, render it this way:
      if (inline || isShortBlock) {
        return (
          <Box
            component="code"
            sx={{
              ...inlineStyle,
              // If it was a block, make it display like one so it respects margins
              display: isShortBlock ? 'inline-block' : 'inline', 
              my: isShortBlock ? 0.5 : 0, // Add vertical margin if it was a block
            }}
          >
            {children}
          </Box>
        );
      }

      // Otherwise, render the full CodeBlock component
      return (
        <CodeBlock language={lang} {...props}>
          {children}
        </CodeBlock>
      );
    },

    // --- Other components remain the same ---
    ul({ children }) {
      return <List sx={{ listStyleType: 'disc', pl: 4, my: 2 }}>{children}</List>;
    },
    ol({ children }) {
      return <List component="ol" sx={{ listStyleType: 'decimal', pl: 4, my: 2 }}>{children}</List>;
    },
    li({ children }) {
      return <ListItem sx={{ display: 'list-item', p: 0, mb: 0.5 }}>{children}</ListItem>;
    },
    blockquote({ children }) {
      return (
        <Box
          component="blockquote"
          sx={{
            borderLeft: 4,
            borderColor: 'grey.300',
            pl: 2,
            my: 2,
            fontStyle: 'italic',
            color: 'text.secondary',
          }}
        >
          {children}
        </Box>
      );
    },
    h1({ children }) {
      return <Typography variant="h4" component="h1" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>{children}</Typography>;
    },
    h2({ children }) {
      return <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>{children}</Typography>;
    },
    h3({ children }) {
      return <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>{children}</Typography>;
    },
    h4({ children }) {
      return <Typography variant="subtitle1" component="h4" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>{children}</Typography>;
    },
    a({ children, href }) {
      return <Link href={href} target="_blank" rel="noopener noreferrer">{children}</Link>;
    },
    table({ children }) {
      return <TableContainer component={Paper} sx={{ my: 2, overflowX: 'auto' }}><Table sx={{ minWidth: 650 }}>{children}</Table></TableContainer>;
    },
    thead({ children }) {
      return <TableHead sx={{ bgcolor: 'grey.100' }}>{children}</TableHead>;
    },
    tbody({ children }) {
      return <TableBody>{children}</TableBody>;
    },
    tr({ children }) {
      return <TableRow>{children}</TableRow>;
    },
    th({ children }) {
      return <TableCell component="th" scope="col" sx={{ fontWeight: 'bold' }}>{children}</TableCell>;
    },
    td({ children }) {
      return <TableCell>{children}</TableCell>;
    },
    hr() {
      return <Divider sx={{ my: 3 }} />;
    },
    img({ src, alt }) {
      return <Box component="img" src={src} alt={alt} sx={{ maxWidth: '100%', height: 'auto', borderRadius: 2, my: 2 }} />;
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ fontSize: '15px', color: 'text.primary', wordBreak: 'break-word' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
};

export default AIResponsePreview;