import dayjs from 'dayjs'

export function formatCurrentDay() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}
