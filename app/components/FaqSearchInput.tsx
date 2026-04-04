"use client"

import SearchInput from "./SearchInput"

export default function FaqSearchInput({ defaultValue = "" }: { defaultValue?: string }) {
  return <SearchInput defaultValue={defaultValue} placeholder="Tìm kiếm câu hỏi..." />
}
