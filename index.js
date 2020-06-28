const express = require('express')
const axios = require('axios')

const app = express()

//WORK 
//2 route
//homepage: list of links for all users
//userpage: details of user activity
//atractive banner at the top


function render (title, content) {
    const page = `<html>
             
    <head>
     <title>${title}</title>
    </head>
    <body>
    <h1><a href='/'>User Dashboard</a></h1>
    ${content}
    </body>
    </<html>`

    return page

}

app.get (
    '/',
    async (request, response, next) => {
        try {
            const list = await axios
             .get ('http://localhost:4000')

             const names = list
              .data
               .map(user => `<p>
               <a href='/${user.name}'>${user.name}</a>
               </p>`)
                .join(' ')
             
            const page = render('User Dashboard', names)

             response.send(page)

        } catch (error) {
            next(error)

        }


    }

)

app.get (
    '/:user',
    async (request, response, next) => {
        try{
            const url = `http://localhost:4000/user/${request.params.user}`
            
            const user = await axios.get(url)

            const content = `<h2> Last websites</h2>
            <p>${user.data.website}</p>
            <h2>Hours online per day</h2>
            <p>${user.data.hours}</p>` 
            
            const page = render(user.data.name, content)

            response.send(page)

        } catch (error) {
            next(error)

        }


    }
    )

const port = 3000

app.listen(
    port,
    () => console.log(`Listen now on PORT : ${port}`)
    )