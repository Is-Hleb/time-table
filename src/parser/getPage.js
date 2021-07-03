export const getPage = async (searchUrl) => {
    const response = await fetch(searchUrl)
    return await response.text()
}
