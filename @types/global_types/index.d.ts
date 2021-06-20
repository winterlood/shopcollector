//  ./@types/custom-types/index.d.ts
declare module "@global_types" {
    export namespace meta_types {
        type DailyBestCategory=
        '여성패션'
        |'남성패션'
        |'뷰티'
        |'출산-유아동'
        |'식품'
        |'주방용품'
        |'생활용품'
        |'홈인테리어'
        |'가전디지털'
        |'스포츠-레저'
        |'자동차용품'
        |'도서-음반-DVD'
        |'완구-취미'
        |'문구-오피스'
        |'헬스-건강식품'
        |'국내여행'
        |'해외여행'
        |'반려동물용품'
        |'유아동패션'

       type DailyBestItem = {
         createdDate: string; 
         id: string; 
         pureCreatedDate: string; 
         category: DailyBestCategory;
         thumbnailImageUrl:string
       }
    }
}
