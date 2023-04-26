const exportRE = /export default (.*)/
const cjsExport = /module.exports\s*=\s*(.*)/

const getUrlMatches = (content: string | null) => {
  if (!content) {
    return []
  }
  if (cjsExport.test(content)) {
    return content.match(cjsExport) ?? []
  }
  return content.match(exportRE) ?? []
}

export const patchNamed = (content: string, prevContent: string | null, { componentName }: { componentName: string }) => {
  const urlMatch = getUrlMatches(prevContent)
  let next = content.replace(exportRE, '')
  next = `
${next}
export { ${componentName} };
${urlMatch?.[0] ? urlMatch?.[0] : ''}
  `
  return next
}
