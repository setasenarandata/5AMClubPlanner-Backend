const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID
let blockToken = '' 
const getPage = async () => {
  const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });
  const blockIdentifier = response.results[0].id
  return blockIdentifier;
}
function refresh() {
  const getId = (async () => {
    return await getPage()
  })
  
  const blockId = (async () => {
    const blockIdentifier = await getId()
    return blockIdentifier
  })
  // console.log("hello youre in")
  blockId().then(res => {
    blockToken = res;
    console.log(blockToken)
  });
}
refresh()
module.exports = async function getContent() {
  refresh()
  const payload = {
    path: `blocks/${blockToken}/children`,
    method: 'GET'
  } 
  console.log("hello sena")
  
  const { results } = await notion.request(payload)
  
  var resEnd = []
  const goalsForToday = results.map((content, index) => {
    if (content.type == 'to_do') {
      var object = {}
      if (index == 2) {
        object["id"] = index
        object["type"] = "one_first"
        object["counter"] = "1st"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      } else if (index == 3) {
        object["id"] = index
        object["type"] = "one_second"
        object["counter"] = "2nd"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      } else if (index == 4) {
        object["id"] = index
        object["type"] = "one_third"
        object["counter"] = "3rd"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      }
    }
  })
  return resEnd;
}