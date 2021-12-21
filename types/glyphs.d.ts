export interface GlyphPackInfo {
    name: string,
    description: string,
    artist: string,
    id: string,
    stickerURLs: Array<string>,
  }
  
  export type GlyphPack = { [packName: string]: GlyphPackInfo }