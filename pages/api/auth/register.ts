// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../utils/mongoConnect'
import User from '../../../models/User'
type Data = {
  name: string
  error: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { email, password , name } = req.body
    if (!email || !password || !name) {
      return res.status(422).json({
          error: 'Please add all the fields',
          name: 'Error'
      })
    }
   connectDB().then(() => {
    const CreatedUser = new User({
        email,
        password,
        name
    })
    CreatedUser.save().then((user: any) => {
        res.status(200).json({
            name: 'User created',
            error: ''
        })
        }).catch((err: any) => {
            console.log(err)
            res.status(500).json({
                name: 'Error creating user',
                error: ''
            })
        }
    )
 
  }).catch((err) => {
    console.log(err)
  })

}
