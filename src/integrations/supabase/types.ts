export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calculations: {
        Row: {
          calculation_data: Json | null
          created_at: string
          customer_id: string
          id: string
          result: Json | null
          roi_prompt: string
          user_id: string
        }
        Insert: {
          calculation_data?: Json | null
          created_at?: string
          customer_id: string
          id?: string
          result?: Json | null
          roi_prompt: string
          user_id: string
        }
        Update: {
          calculation_data?: Json | null
          created_at?: string
          customer_id?: string
          id?: string
          result?: Json | null
          roi_prompt?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          company: string | null
          created_at: string
          custom_variables: Json | null
          enrichment_data: Json | null
          id: string
          name: string | null
          other_info: string | null
          updated_at: string
          user_id: string
          work_email: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          custom_variables?: Json | null
          enrichment_data?: Json | null
          id?: string
          name?: string | null
          other_info?: string | null
          updated_at?: string
          user_id: string
          work_email: string
        }
        Update: {
          company?: string | null
          created_at?: string
          custom_variables?: Json | null
          enrichment_data?: Json | null
          id?: string
          name?: string | null
          other_info?: string | null
          updated_at?: string
          user_id?: string
          work_email?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          domain: string | null
          email: string | null
          id: string
          phone_number: string | null
          use_case: string | null
        }
        Insert: {
          created_at?: string
          domain?: string | null
          email?: string | null
          id?: string
          phone_number?: string | null
          use_case?: string | null
        }
        Update: {
          created_at?: string
          domain?: string | null
          email?: string | null
          id?: string
          phone_number?: string | null
          use_case?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      solutions: {
        Row: {
          demo_url: string
          id: string
          lead_id: string
          type: string
        }
        Insert: {
          demo_url: string
          id?: string
          lead_id: string
          type: string
        }
        Update: {
          demo_url?: string
          id?: string
          lead_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "solutions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      user_leads: {
        Row: {
          call_completed_at: string | null
          call_duration: number | null
          company: string | null
          created_at: string
          custom_data: Json | null
          email: string | null
          id: string
          last_contact: string | null
          meeting_booked: boolean | null
          name: string
          next_action: string | null
          phone: string | null
          position: string | null
          qualified: boolean | null
          status: string | null
          transcript: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          call_completed_at?: string | null
          call_duration?: number | null
          company?: string | null
          created_at?: string
          custom_data?: Json | null
          email?: string | null
          id?: string
          last_contact?: string | null
          meeting_booked?: boolean | null
          name: string
          next_action?: string | null
          phone?: string | null
          position?: string | null
          qualified?: boolean | null
          status?: string | null
          transcript?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          call_completed_at?: string | null
          call_duration?: number | null
          company?: string | null
          created_at?: string
          custom_data?: Json | null
          email?: string | null
          id?: string
          last_contact?: string | null
          meeting_booked?: boolean | null
          name?: string
          next_action?: string | null
          phone?: string | null
          position?: string | null
          qualified?: boolean | null
          status?: string | null
          transcript?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          id: string
          roi_prompt: string | null
          updated_at: string
          user_id: string
          webhook_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          roi_prompt?: string | null
          updated_at?: string
          user_id: string
          webhook_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          roi_prompt?: string | null
          updated_at?: string
          user_id?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          api_key: string | null
          destination: string
          id: string
        }
        Insert: {
          api_key?: string | null
          destination: string
          id?: string
        }
        Update: {
          api_key?: string | null
          destination?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
