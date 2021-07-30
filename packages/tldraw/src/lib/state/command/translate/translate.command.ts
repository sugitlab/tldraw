import { Vec } from '@tldraw/core'
import { Data } from '../../../types'
import { TLD } from '../../tld'
import { Command } from '../command'

export function translate(data: Data, delta: number[]) {
  const ids = [...TLD.getSelectedIds(data)]

  const shapesToTranslate = ids
    .flatMap((id) => TLD.getDocumentBranch(data, id))
    .map((id) => {
      const shape = data.page.shapes[id]
      return {
        id,
        prev: { point: [...shape.point] },
        next: { point: Vec.add(shape.point, delta) },
      }
    })

  return new Command({
    name: 'translate_shapes',
    category: 'canvas',
    do(data) {
      const { shapes } = data.page

      for (const { id, next } of shapesToTranslate) {
        const shape = shapes[id]
        TLD.mutate(data, shape, { ...next })
      }
    },
    undo(data) {
      const { shapes } = data.page

      for (const { id, prev } of shapesToTranslate) {
        const shape = shapes[id]
        TLD.mutate(data, shape, { ...prev })
      }
    },
  })
}
