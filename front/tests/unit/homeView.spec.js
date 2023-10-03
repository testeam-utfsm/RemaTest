import { describe, it, expect, vi } from 'vitest'

import axios from 'axios'

import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

vi.mock('axios')

describe('HomeView', () => {
  it('when click on ', async  () => {
    const wrapper = mount(HomeView)

    const axios = await import('axios')

    axios.get = vi.fn().mockResolvedValue('OK')

    await wrapper.get('button').trigger('click')

    expect(axios.get).toHaveBeenCalled(1)

    // expect(wrapper.text()).toMatch('Crea una subastaRegistrar')
  })
})
