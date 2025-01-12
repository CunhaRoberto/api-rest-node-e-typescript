import {ETableNames} from '../../ETableNames'
import { ICidade}  from '../../models'
import { Knex} from '../../knex'
import InternalServerErrorException from '../../../../core/exceptions/InternalServerErrorException'

export const getAll = async( page: number, limit: number, filter: string |undefined ): Promise< ICidade[]> => {
    try{
        let query = Knex(ETableNames.cidade)
        .select('*')
        // .where ('nomeCompleto', 'like', `%${filter}%`)
        .offset((page-1) * limit)
        .limit(limit)

        if (filter && filter.trim() !== '') {
            query = query.whereRaw('LOWER(nome) LIKE LOWER(?)', [`%${filter}%`]);
          }

        const result = await query;
        
        return result

    }catch(error){
        console.error(error);      
        throw new InternalServerErrorException('Erro ao realizar a pesquisa. Por favor, tente novamente mais tarde.');
    }
}

