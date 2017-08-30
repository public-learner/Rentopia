export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getDays = () => {
  let daysArray = []
  for (let i=1; i<=31; i++) {
    daysArray.push(i.toString())
  }
  return daysArray
}

export const days = getDays()

const getYears = () => {
  let yearsArray = []
  let currentYear = new Date().getFullYear()
  for (let i=currentYear; i>=1950; i--) {
    yearsArray.push(i.toString())
  } 
  return yearsArray
}

export const years = getYears()