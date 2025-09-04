import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  Folder, 
  File, 
  Image, 
  FileText, 
  Music, 
  Video, 
  Archive,
  ChevronRight,
  ChevronDown,
  HardDrive,
  Home,
  Download
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  children?: FileItem[];
  expanded?: boolean;
  fileType?: string;
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    modified: '2024-01-15',
    expanded: true,
    children: [
      { id: '1-1', name: 'Projects', type: 'folder', modified: '2024-01-15', children: [] },
      { id: '1-2', name: 'Report.pdf', type: 'file', size: '2.3 MB', modified: '2024-01-14', fileType: 'pdf' },
      { id: '1-3', name: 'Notes.txt', type: 'file', size: '15 KB', modified: '2024-01-13', fileType: 'text' }
    ]
  },
  {
    id: '2',
    name: 'Pictures',
    type: 'folder',
    modified: '2024-01-12',
    children: [
      { id: '2-1', name: 'vacation.jpg', type: 'file', size: '4.2 MB', modified: '2024-01-12', fileType: 'image' },
      { id: '2-2', name: 'screenshot.png', type: 'file', size: '1.8 MB', modified: '2024-01-11', fileType: 'image' }
    ]
  },
  {
    id: '3',
    name: 'Downloads',
    type: 'folder',
    modified: '2024-01-10',
    children: [
      { id: '3-1', name: 'software.zip', type: 'file', size: '156 MB', modified: '2024-01-10', fileType: 'archive' },
      { id: '3-2', name: 'music.mp3', type: 'file', size: '8.4 MB', modified: '2024-01-09', fileType: 'audio' }
    ]
  }
];

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <Folder className="h-4 w-4 text-blue-500" />;
    }
    
    switch (item.fileType) {
      case 'image':
        return <Image className="h-4 w-4 text-green-500" />;
      case 'pdf':
      case 'text':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'audio':
        return <Music className="h-4 w-4 text-purple-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-orange-500" />;
      case 'archive':
        return <Archive className="h-4 w-4 text-yellow-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const toggleFolder = (itemId: string) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, expanded: !item.expanded };
        }
        if (item.children) {
          return { ...item, children: updateFiles(item.children) };
        }
        return item;
      });
    };
    setFiles(updateFiles(files));
  };

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map(item => (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer ${
            depth > 0 ? 'ml-' + (depth * 4) : ''
          }`}
          onClick={() => item.type === 'folder' && toggleFolder(item.id)}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {item.type === 'folder' && (
            item.expanded ? 
              <ChevronDown className="h-3 w-3" /> : 
              <ChevronRight className="h-3 w-3" />
          )}
          {getFileIcon(item)}
          <span className="flex-1 text-sm">{item.name}</span>
          {item.size && (
            <Badge variant="secondary" className="text-xs">
              {item.size}
            </Badge>
          )}
        </div>
        {item.type === 'folder' && item.expanded && item.children && (
          <div>
            {renderFileTree(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <Card className="h-full bg-gradient-to-br from-background to-muted/20">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">File Explorer</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <HardDrive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          /Users/username
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {renderFileTree(files)}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border/50 bg-muted/20">
        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>3 folders, 5 files</span>
            <span>Total: 172.7 MB</span>
          </div>
        </div>
      </div>
    </Card>
  );
}