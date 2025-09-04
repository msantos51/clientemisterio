// Função para integrar Zod com react-hook-form sem dependências externas
import { ZodSchema, ZodError } from 'zod'
import type { Resolver } from 'react-hook-form'

// Cria um resolver que valida dados usando um esquema Zod
export function zodResolver<T extends ZodSchema>(schema: T): Resolver<any> {
  return async (values) => {
    try {
      // Tenta validar os valores e devolve-os sem erros
      const data = await schema.parseAsync(values)
      return { values: data, errors: {} }
    } catch (err) {
      const zodErr = err as ZodError
      // Converte erros do Zod para o formato esperado pelo react-hook-form
      const formErrors = zodErr.errors.reduce((acc: Record<string, any>, curr) => {
        const path = curr.path[0] as string
        acc[path] = { type: curr.code, message: curr.message }
        return acc
      }, {})
      return { values: {}, errors: formErrors }
    }
  }
}
