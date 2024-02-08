export type ClothingCategory = 'dress' | 'skirt' | 'shirt' | 'sweater' | 'jacket' | 'pants' | 'tights' | 'socks' | 'leggings' | 'cardigan';

export interface ClothingProp { 
  id: string;
  category: ClothingCategory;
  brand: string;
  color: string;
  size: string;
  season: string;
  wearCount: number;
  cost: number;
  formality: string;
  img: string;
}

export interface FormProps {
  handleClothingSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  newClothing: ClothingProp;
  handleClothesFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSuccess: boolean;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ClothingCardProps {
  clothingProp: ClothingProp;
}