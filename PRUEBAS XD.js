const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://magouwu:Katieteamo@cluster0.199wf.mongodb.net/miapp?retryWrites=true&w=majority')

const User = mongoose.model('User',{
    username: String,
    password: String,
})

const crear = async ()=>{
    const user = new User({username: 'mago kin', password: 'caritasad'})
    const savedUser = await user.save()
    console.log(savedUser)
}
const buscarTodo = async ()=>{
    const users = await User.find()
    console.log(users)
}
const buscar = async ()=>{
    const user = await User.find({username:'mago'})
    console.log(user)
}
const buscarUno = async()=>{
    const user = await User.findOne({username: 'mago'})
    console.log(user)
}
const update = async()=>{
    const user = await User.findOne({username: 'mago'}) // aqui tenemos que buscar especificamente al usuario
    user.password = 'xddd' // aqui entramos a user luego password e indicamos nueva password
    await user.save() //usar await porque devuelve una promesa, salvar para que se actualice
}
const destroy = async ()=>{
    const user = await User.findOne({username: 'mago'}) //buscar al usuario especifico
    if(user){          //validando si el user existe
    await user.remove() //remover en caso de que si exista
    }
} 
// update()
// destroy()
// buscarTodo()
// buscar()
// buscarTodo()
// crear()


 // get: async (req,res)=>{
    //     const {id} = req.params
    //     const user = await Users.findOne({_id: id})
    //     res.status(200).send(user)
    // },
    // list: async (req,res)=>{
    //     const users = await Users.find()
    //     res.status(200).send(users)
    // },
    // create: async (req,res)=>{
    //     const user = new Users(req.body)
    //     const savedUser = await user.save() 
    //     res.status(200).send(savedUser._id)
    // },
    // update: async (req,res)=>{
    //     const {id} = req.params
    //     const user = await Users.findOne({_id: id})
    //     Object.assign(user,req.body)
    //     await user.save()
    //     res.status(200).send("Actualizando Usuario")
    // },
    // destroy: async (req,res)=>{
    //     const {id} = req.params
    //     const user = await Users.findOne({_id: id})
    //     if(user){
    //         user.remove()
    //     }
    //     res.status(200).send("Eliminando Usuario")
    // }