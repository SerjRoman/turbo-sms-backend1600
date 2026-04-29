import { Request, Response } from "express";
import { AuthenticatedUser } from "../../types/token.types"
import { ContactControllerContract } from "./types/contact.contract"
import { UserContact } from "./types/contact.types"
import { ContactService } from "./contact.service"

export const ContactController: ContactControllerContract = {
    async getAll(req, res, next){
        try {
            const contacts = await  ContactService.getAll(res.locals.id)
            res.status(200).json(contacts)
        } catch (error) {
            next(error)
        }
    },
    async getContactById(req, res, next){
        try {
            const contact = await ContactService.getContactById(res.locals.userId)
            res.status(200).json(contact)
        } catch (error) {
            next(error)
        }
    },
    async createContact( req, res, next){
        try {
            const createdContact = await ContactService.create(req.body.data)
            res.status(200).json(createdContact)
        } catch (error) {
            next(error)
        }
    }
}



