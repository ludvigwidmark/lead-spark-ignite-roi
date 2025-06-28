
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    console.log('VAPI callback received:', body)

    const {
      rowId,
      status,
      callDuration,
      transcript,
      meetingBooked,
      qualified
    } = body

    if (!rowId) {
      return new Response(
        JSON.stringify({ error: 'Missing rowId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update the lead with call results
    const { data, error } = await supabase
      .from('user_leads')
      .update({
        status: status || 'completed',
        call_duration: callDuration,
        transcript: transcript,
        meeting_booked: meetingBooked || false,
        qualified: qualified,
        call_completed_at: new Date().toISOString()
      })
      .eq('id', rowId)
      .select()

    if (error) {
      console.error('Error updating lead:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to update lead' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Lead updated successfully:', data)

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in vapi-callback:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
