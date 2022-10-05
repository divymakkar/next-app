export interface IFaq {
  id: number;
  position: number;
  question: string;
  answer: string;
}

export interface IReview {
  customer_name: string;
  review_content: string;
  rating: number;
  gallery_media: [];
  helpful_count: number;
  created_at: Date;
  customer_profile_image_url: string;
  tags: IReviewTag[];
}

export interface IReviewTag {
  id: number;
  name: string;
  tag_type: string;
  state: string;
  created_at: Date;
  updated_at: Date;
}

export interface IGalleryMediaObj {
  id: number;
  media_urls: {
    thumbnail: string;
    placeholder: string;
    original: string;
    ui_gallery: string;
    mobile_web_gallery: string;
  };
  caption: string;
  position: number;
  is_featured: boolean;
  partner_file_attachment_id: number;
}
