import {EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent} from "typeorm"
import moment = require("moment")



@EventSubscriber()
export class GeneralSubscriber implements EntitySubscriberInterface<any> {

    public async afterInsert(event: InsertEvent<any>) {
        const {entity} = event
        var entityType = entity.constructor.name
        if (typeof entity === 'undefined') return
        console.log('\x1b[33m%s\x1b[0m', "insert", entityType, moment().unix())
    }

    public async afterUpdate(event: UpdateEvent<any>) {
        const {entity} = event
        var entityType = entity.constructor.name
        if (typeof entity === 'undefined') return
        console.log('\x1b[33m%s\x1b[0m', "insert", entityType, moment().unix())
    }

    public async beforeRemove(event: RemoveEvent<any>) {
        const {entity} = event
        var entityType = entity.constructor.name
        if (typeof entity === 'undefined') return
        console.log('\x1b[33m%s\x1b[0m', "insert", entityType, moment().unix())
    }
}