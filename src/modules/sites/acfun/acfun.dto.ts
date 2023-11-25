export class CreateDto {}
export class UpdateDto extends CreateDto {}
export class QueryDto {
  tab: 'DAY' | 'THREE_DAYS' | 'WEEK'
  date?: string
}
