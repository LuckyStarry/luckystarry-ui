/* tslint:disable */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import index from '../src/index'

describe('Test On Ready', function() {
  it('All be fine', function() {
    expect(index).is.not.null
  })
})
