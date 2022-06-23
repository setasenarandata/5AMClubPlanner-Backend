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
      if (index == 7) {
        object["id"] = index
        object["type"] = "first_task"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      } else if (index == 8) {
        object["id"] = index
        object["type"] = "second_task"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      } else if (index == 9) {
        object["id"] = index
        object["type"] = "third_task"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      } else if (index == 10) {
        object["id"] = index
        object["type"] = "fourth_task"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      } else if (index == 11) {
        object["id"] = index
        object["type"] = "fifth_task"
        object["content"] = content.to_do.rich_text[0].plain_text
        object["chekced"] = content.to_do.checked
        resEnd.push(object)
      }
    }
  })
  return resEnd;
}