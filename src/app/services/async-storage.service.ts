
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

interface Entity {
    _id: string,
}

function query(entityType: string, delay: number = 100): Promise<Entity[]> {
    var entities: Entity[] = JSON.parse(localStorage.getItem(entityType) || '[]')

    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(entities) }, delay)
    })
}

async function get(entityType: string, entityId: string) {
    const entities: Entity[] = await query(entityType)
    return entities.find(entity => entity._id === entityId)
}

async function post(entityType: string, newEntity: Entity) {
    newEntity._id = _makeId()
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType: string, updatedEntity: Entity) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType: string, entityId: string) {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
}

async function postMany(entityType: string, newEntities: Entity[]) {
    const entities = await query(entityType)
    newEntities = newEntities.map(entity => {
        return entity._id ? entity :
            { ...entity, _id: _makeId() }
    })
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
}

function _save(entityType: string, entities: Entity[]): void {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}