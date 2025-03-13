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
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published_at: string | null
          read_time: number | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          product_interest: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          product_interest?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          product_interest?: string | null
          status?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string
          product_interest: string | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone: string
          product_interest?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          product_interest?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string | null
          id: string
          path: string
          referrer: string | null
          screen_size: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          path: string
          referrer?: string | null
          screen_size?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          path?: string
          referrer?: string | null
          screen_size?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_views: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          product_name: string
          product_slug: string
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          product_name: string
          product_slug: string
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          product_name?: string
          product_slug?: string
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          features: string[] | null
          id: string
          image_url: string | null
          name: string
          specifications: Json | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          name: string
          specifications?: Json | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          name?: string
          specifications?: Json | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string | null
          content: string
          created_at: string | null
          id: string
          name: string
          position: string | null
          rating: number | null
        }
        Insert: {
          company?: string | null
          content: string
          created_at?: string | null
          id?: string
          name: string
          position?: string | null
          rating?: number | null
        }
        Update: {
          company?: string | null
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          position?: string | null
          rating?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_product_views: {
        Args: {
          product_id_param: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
