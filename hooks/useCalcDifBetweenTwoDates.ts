import { useTranslation } from 'next-i18next'

export const useCalcDifBetweenTwoDates = () => {
  const { t } = useTranslation()
  const calculate = (notificationsData: string) => {
    let currentDate: Date = new Date()
    let createdDate: Date = new Date(notificationsData)

    let dif: number = +currentDate - +createdDate
    let difInMinutes = ~~(dif / 1000 / 60)
    let difInHours = ~~(difInMinutes / 60)
    let difInDays = ~~(difInHours / 24)
    let difInYears = ~~(difInDays / 365)

    if (difInMinutes < 60) {
      return `${difInMinutes} ${t('common:minAgo')}`
    } else if (difInMinutes > 60 && difInMinutes < 1440) {
      return `${difInHours} ${t('common:hourAgo')}`
    } else if (difInMinutes >= 1440 && difInMinutes < 525600) {
      return `${difInDays} ${t('common:dayAgo')}`
    } else if (difInMinutes >= 525600) {
      return `${difInYears} ${t('common:yearAgo')}`
    }
  }
  return { calculate }
}
