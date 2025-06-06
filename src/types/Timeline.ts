export interface TimelineItem {
  Id: number;
  Title: string;
  Media: number;
  Description: string;
  Image: string;
  Icon: string;
  Audio: string;
  RemoteId: string;
  Status: number;
  isActive: number;
  inId: string;
  CreateDate: string;
  MediaName: string;
  Category: string;
  Epoch: number;
  AudioSize: number;
}

export interface TimelineResponse {
  Body: any[]; 
  Timeline: TimelineItem[];
} 