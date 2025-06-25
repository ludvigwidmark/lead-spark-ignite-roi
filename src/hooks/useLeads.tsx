
import { useState, useEffect } from 'react'
import { supabase, Lead } from '@/lib/supabase'
import { useAuth } from './useAuth'

export const useLeads = () => {
  const { user } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchLeads()
    } else {
      setLeads([])
      setLoading(false)
    }
  }, [user])

  const fetchLeads = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setLeads(data || [])
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const addLeads = async (newLeads: Omit<Lead, 'id' | 'user_id' | 'created_at'>[]) => {
    if (!user) return

    try {
      const leadsWithUserId = newLeads.map(lead => ({
        ...lead,
        user_id: user.id,
      }))

      const { data, error } = await supabase
        .from('leads')
        .insert(leadsWithUserId)
        .select()

      if (error) throw error
      
      setLeads(prev => [...(data || []), ...prev])
      return { data, error: null }
    } catch (error) {
      console.error('Error adding leads:', error)
      return { data: null, error }
    }
  }

  return {
    leads,
    loading,
    addLeads,
    refreshLeads: fetchLeads,
  }
}
