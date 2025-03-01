// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { linksTable } from '@/lib/db/schema'
import { desc, and, eq, isNull } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'

type Response = {
  id: number
  title: string
  url: string
  created_at: Date | null
  updated_at: Date | null
  deleted_at: Date | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>,
) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const data = await db
    .select()
    .from(linksTable)
    .where(
      and(
        isNull(linksTable.deleted_at),
        eq(linksTable.email, String(session?.email)),
      ),
    )
    .orderBy(desc(linksTable.updated_at))

  res.status(200).json({ data })
}
