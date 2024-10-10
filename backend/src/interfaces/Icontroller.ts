import { Request , Response} from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {ParsedQs} from 'qs'



export interface Icontroller {

    addUser( 
        req: Request< ParamsDictionary , any, ParsedQs, Record<string, any>> , 
        res : Response<any, Record<string, any>> 
    ) : void



}