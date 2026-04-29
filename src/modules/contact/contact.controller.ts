import { Request, Response } from "express";
import { ContactControllerContract } from "./types/contact.contract"
import { ContactService } from "./contact.service"

export const ContactController: ContactControllerContract = {
    async getAll(req, res, next){
        try {
            const contacts = await ContactService.findAll(res.locals.id)
            res.status(200).json(contacts)
        } catch (error) {
            next(error)
        }
    },
    async getContactById(req, res, next){
        try {
            const contact = await ContactService.findById(parseInt(req.params.id), res.locals.id)
            res.status(200).json(contact)
        } catch (error) {
            next(error)
        }
    },
    async createContact(req, res, next){
        try {
            const { localName, contactUserId, avatar } = req.body;
            const data = {
                localName,
                contactUserId: Number(contactUserId),
                contactOwnerId: res.locals.id,
                ...(avatar && { avatar }),
            };
            const createdContact = await ContactService.create(data)
            res.status(200).json(createdContact)
        } catch (error) {
            next(error)
        }
    }
}