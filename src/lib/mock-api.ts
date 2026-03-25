import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './mock-auth';

// Mock data
const mockContent = [
  {
    id: 1,
    title: "Finding Peace in Daily Life",
    excerpt: "Discover how to cultivate inner peace through simple daily practices.",
    category: "spiritual-growth",
    content: "Full article content here...",
    body: "Full article content here...",
    author: "John Smith",
    authorName: "John Smith",
    publishedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "The Power of Community",
    excerpt: "Building meaningful connections strengthens our faith journey.",
    category: "community",
    content: "Full article content here...",
    body: "Full article content here...",
    author: "Sarah Johnson",
    authorName: "Sarah Johnson",
    publishedAt: "2024-01-10T14:30:00Z",
    createdAt: "2024-01-10T14:30:00Z",
  },
];

const mockPosts = [
  {
    id: 1,
    title: "Welcome to the Community",
    content: "Introduce yourself and share your journey with us!",
    body: "Introduce yourself and share your journey with us!",
    authorName: "Admin",
    author: "Admin",
    createdAt: "2024-01-15T09:00:00Z",
    replyCount: 1,
    replies: [
      {
        id: 1,
        content: "Great to be here! Looking forward to connecting with everyone.",
        body: "Great to be here! Looking forward to connecting with everyone.",
        authorName: "Ololade Tosin",
        author: "Ololade Tosin",
        createdAt: "2024-01-15T10:00:00Z",
      }
    ]
  },
];

const mockEvents = [
  {
    id: 1,
    title: "Sunday Service",
    description: "Join us for our weekly Sunday service and fellowship",
    date: "2024-01-20T10:00:00Z",
    eventDate: "2024-01-20T10:00:00Z",
    location: "Main Sanctuary",
    isVirtual: false,
    registrationUrl: null,
    link: null,
  },
  {
    id: 2,
    title: "Bible Study Group",
    description: "Weekly bible study and discussion group",
    date: "2024-01-17T19:00:00Z",
    eventDate: "2024-01-17T19:00:00Z",
    location: "Community Hall",
    isVirtual: false,
    registrationUrl: null,
    link: null,
  },
];

const mockPrayerRequests = [
  {
    id: 1,
    title: "Health Recovery",
    request: "Prayers needed for health recovery",
    body: "Prayers needed for health recovery",
    isAnonymous: false,
    author: "Ololade Tosin",
    authorName: "Ololade Tosin",
    createdAt: "2024-01-15T08:00:00Z",
    prayerCount: 5,
  },
];

// Mock hooks
export function useListContent() {
  return useQuery({
    queryKey: ['content'],
    queryFn: () => Promise.resolve({ items: mockContent }),
  });
}

export function useGetContent(id: number) {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => Promise.resolve(mockContent.find(c => c.id === id)),
  });
}

export function useListPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => Promise.resolve({ items: mockPosts }),
  });
}

export function useGetPost(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => Promise.resolve(mockPosts.find(p => p.id === id)),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: (data: { title: string; content: string; data?: any }) => 
      Promise.resolve({ 
        id: Date.now(), 
        title: data.title,
        content: data.content,
        body: data.content,
        authorName: user?.name || "User", 
        author: user?.name || "User", 
        createdAt: new Date().toISOString(),
        replyCount: 0,
        replies: []
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useCreateReply() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: (data: { postId: number; content: string; id?: number }) => 
      Promise.resolve({ 
        id: data.id || Date.now(), 
        content: data.content, 
        body: data.content,
        authorName: user?.name || "User", 
        author: user?.name || "User", 
        createdAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useListEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => Promise.resolve({ items: mockEvents }),
  });
}

export function useListPrayerRequests() {
  return useQuery({
    queryKey: ['prayer-requests'],
    queryFn: () => Promise.resolve({ items: mockPrayerRequests }),
  });
}

export function useCreatePrayerRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: (data: { request: string; isAnonymous: boolean; data?: any }) => 
      Promise.resolve({ 
        id: Date.now(), 
        title: "Prayer Request",
        request: data.request,
        body: data.request,
        isAnonymous: data.isAnonymous,
        author: data.isAnonymous ? "Anonymous" : (user?.name || "User"),
        authorName: data.isAnonymous ? "Anonymous" : (user?.name || "User"), 
        createdAt: new Date().toISOString(),
        prayerCount: 0,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayer-requests'] });
    },
  });
}
