let axios = require ('axios')
let obj = {

    "username": "zhaoliu",
    "Comments": "赵六",
    "datetime": "2017-05-08"
};
axios.post('http://localhost:3000/comments',obj)
    .then(response =>{
        console.log(response.data)
    })

