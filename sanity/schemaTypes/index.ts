import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {doctorType} from './doctorType'
import {clinicInfoType} from './clinicInfoType'
import {webLinkType} from './webLinkType'
import {faqType} from './faqType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, doctorType, clinicInfoType, webLinkType, faqType],
}
