import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useAuthStore = create((set) => ({
  sesion: null,
  profile: null,
  loading: false,
  setSession: (session) => set({ session }),
  login: async (email, password) => {
    try {
      set({ loading: true })
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)

      if (error || profileError) throw Error()

      set({ profile: profileData[0], session: data.session, loading: false })
      return { error: null }
    } catch (error) {
      set({ loading: false })
      console.log({ error })

      return { error: 'Usuario no encontrado' }
    } finally {
      set({ loading: false })
    }
  },
  register: async ({ email, password, username, role }) => {
    try {
      set({ loading: true })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role, username } }
      })

      if (error) throw new Error(error)

      set({ session: data.session })

      return { error: null }
    } catch (error) {
      set({ loading: false })
      return { error }
    } finally {
      set({ loading: false })
    }
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return Promise.reject(error)
    set({ session: null })
    return Promise.resolve()
  }
}))

export default useAuthStore
