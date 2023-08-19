export const getTitle = (content :String) => {
    const indexOfTitle = content.indexOf('title')
    const indexOfStart = indexOfTitle + 9

    const indexOfEnd = content.indexOf('"', indexOfStart + 1)

    if(indexOfTitle == -1){
      return ""
    } else if (indexOfEnd == -1){
      return content.substring(indexOfStart)
    } else {
      return content.substring(indexOfStart, indexOfEnd)
    }
  }

export const getSummary = (content :String) => {
    const indexOfSummary = content.indexOf('summary')
    const indexOfStart = indexOfSummary + 11

    const indexOfEnd = content.indexOf('"', indexOfStart + 1)

    if(indexOfSummary == -1){
        return ""
    } else if (indexOfEnd == -1){
        return content.substring(indexOfStart)
    } else {
        return content.substring(indexOfStart, indexOfEnd)
    }
}