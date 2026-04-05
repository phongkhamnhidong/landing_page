import type {StructureResolver} from 'sanity/structure'
import {BookIcon, TagIcon, HelpCircleIcon, DocumentTextIcon} from '@sanity/icons'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Phòng Khám Nhi Đồng')
    .items([
      S.documentTypeListItem('clinicInfo').title('Thông Tin Phòng Khám'),
      S.documentTypeListItem('doctor').title('Bác Sĩ'),
      S.divider(),

      // ── Bài Viết split by section then category ──
      S.listItem()
        .title('Bài Viết')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Bài Viết')
            .items([

              // Kiến Thức Y Khoa
              S.listItem()
                .title('📚 Kiến Thức Y Khoa')
                .icon(BookIcon)
                .child(
                  S.documentList()
                    .title('Tất cả — Kiến Thức')
                    .filter('_type == "post" && section == "kienThuc"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                    .child((postId) =>
                      S.document().documentId(postId).schemaType('post')
                    )
                ),

              // Kiến Thức by category
              S.listItem()
                .title('📚 Kiến Thức — Theo Danh Mục')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Kiến Thức — Theo Danh Mục')
                    .items([
                      {_id: 'b06cfeda-ad64-4143-9175-15a60b66f32b', title: 'Bệnh Truyền Nhiễm'},
                      {_id: '641cf324-3ee2-48cb-ae94-ea4c39c6878a', title: 'Các Bệnh Khác'},
                      {_id: 'fa2a4b75-3b75-49ab-919a-15a9e8a90acc', title: 'Chích Ngừa'},
                      {_id: '429ed2eb-5aef-4ddf-9ac3-3231c867b4b7', title: 'Dinh Dưỡng'},
                      {_id: '59bf9924-5d5a-4836-b7ce-46a0ba76b8d9', title: 'Hô Hấp'},
                      {_id: '2ffa9309-6622-40b9-a92f-4914d3089127', title: 'Huyết Học'},
                      {_id: 'cbf4414c-5f13-40c8-a9a0-6fd2833d5380', title: 'Mắt | Tai-Mũi-Họng | Răng-Hàm-Mặt'},
                      {_id: '90034e72-3ebb-451d-9082-94e9c346bbc2', title: 'Ngoại Khoa'},
                      {_id: 'f28bb456-8a46-4f4f-8d3a-0aeb1e985986', title: 'Nội Tiết - Tiết Niệu'},
                      {_id: '58089202-4f2e-4184-8eec-910815690ae4', title: 'Sơ Sinh'},
                      {_id: '35bfdd09-abe1-44e3-87db-f0205c08b287', title: 'Tâm Lý'},
                      {_id: '5a691220-ccf2-4f6a-9a49-1735085e4f9a', title: 'Thần Kinh'},
                      {_id: '884fb14c-1523-4e81-9bd3-2a9a9475e6a8', title: 'Tiêu Hoá'},
                      {_id: '4fdbdf5f-364a-4e8d-bba1-949772bbca68', title: 'Tim Mạch'},
                      {_id: '8ae88048-2b7c-4de8-b39c-90e134693b6c', title: 'Xét Nghiệm'},
                    ].map((cat) =>
                      S.listItem()
                        .title(cat.title)
                        .child(
                          S.documentList()
                            .title(cat.title)
                            .filter('_type == "post" && section == "kienThuc" && $catId in categories[]._ref')
                            .params({catId: cat._id})
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                        )
                    ))
                ),

              S.divider(),

              // Tin Tức
              S.listItem()
                .title('📰 Tin Tức')
                .icon(DocumentTextIcon)
                .child(
                  S.documentList()
                    .title('Tất cả — Tin Tức')
                    .filter('_type == "post" && section == "tinTuc"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                    .child((postId) =>
                      S.document().documentId(postId).schemaType('post')
                    )
                ),

              // Tin Tức by category
              S.listItem()
                .title('📰 Tin Tức — Theo Danh Mục')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Tin Tức — Theo Danh Mục')
                    .items([
                      {_id: '02c6efc2-392a-4172-b5bf-10299beace6d', title: 'Đất và Người'},
                      {_id: '5301d5ae-7e39-4a72-9bbb-5d9b8a127c4a', title: 'Tin Tức Khác'},
                      {_id: 'eb6f01dc-724c-442b-b98f-89beda351361', title: 'Tin Tức Y Khoa'},
                    ].map((cat) =>
                      S.listItem()
                        .title(cat.title)
                        .child(
                          S.documentList()
                            .title(cat.title)
                            .filter('_type == "post" && section == "tinTuc" && $catId in categories[]._ref')
                            .params({catId: cat._id})
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                        )
                    ))
                ),
            ])
        ),

      S.documentTypeListItem('category').title('Danh Mục'),
      S.divider(),

      // ── Hỏi Đáp ──
      S.listItem()
        .title('Hỏi Đáp')
        .icon(HelpCircleIcon)
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
