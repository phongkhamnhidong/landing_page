import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Phòng Khám Nhi Đồng')
    .items([
      S.documentTypeListItem('clinicInfo').title('Thông Tin Phòng Khám'),
      S.documentTypeListItem('doctor').title('Bác Sĩ'),
      S.divider(),
      S.documentTypeListItem('post').title('Bài Viết'),
      S.documentTypeListItem('category').title('Danh Mục'),
      S.divider(),
      S.documentTypeListItem('faq').title('Hỏi Đáp'),
      S.documentTypeListItem('webLink').title('Liên Kết Web'),
    ])
