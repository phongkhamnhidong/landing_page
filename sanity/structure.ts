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
      S.listItem()
        .title('Hỏi Đáp')
        .icon(require('@sanity/icons').HelpCircleIcon)
        .child(
          S.list()
            .title('Hỏi Đáp')
            .items([
              S.listItem()
                .title('🆕 Câu hỏi mới')
                .child(
                  S.documentList()
                    .title('Câu hỏi mới')
                    .filter('_type == "faq" && status == "new"')
                    .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('✅ Đã trả lời')
                .child(
                  S.documentList()
                    .title('Đã trả lời')
                    .filter('_type == "faq" && status == "answered"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
            ])
        ),
      S.documentTypeListItem('webLink').title('Liên Kết Web'),
    ])
