export interface GoogleAPIVolumeInfo {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    link: string;
  }
  
  export interface GoogleAPIBook {
      id: string;
      volumeInfo: GoogleAPIVolumeInfo;
  }
  