const state = require('./state.js')
const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../credentials/google-search.json')

const imageDownloader = require('image-downloader')

async function robot() {

    async function fetchGoogleAndReturnImagesLinks(query){
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            imgSize: 'huge',
            num: 2,
        })

        const imageUrl = response.data.items.map((item) => {
            return item.link
        })

        return imageUrl
    }

    async function fetchImagesOfAllSentences(content){
        for(const sentence of content.sentences) {
            const query = `${content.searchTerm} ${sentence.keywords[0]}`
            sentence.images = await fetchGoogleAndReturnImagesLinks(query)

            sentence.googleSearchQuery = query
        }
    }

    async function downloadAndSave(url, fileName){
        return imageDownloader.image({
            url: url,
            dest: `./content/${fileName}`
        })
    }

    async function downloadAllImages(content){
        content.downloadImages = []

        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++){
            const images = content.sentences[sentenceIndex].images

            for (let imageIndex = 0; imageIndex < images.length; imageIndex++){
                const imageUrl = images[imageIndex]

                try{
                    if(content.downloadImages.includes(imageUrl)){
                        throw new Error('Image already downloaded')
                    }

                    await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`)
                    console.log(`> [image-robot] Image downloaded with success: ${imageUrl}`)
                    break
                } catch(error){
                    console.log(`> [image-robot] Download error ${imageUrl}: ${error} `)
                }
            }
        }
    }


    const content = state.load()

    await fetchImagesOfAllSentences(content)
    await downloadAllImages(content)
   
    state.save(content)
}

module.exports = robot