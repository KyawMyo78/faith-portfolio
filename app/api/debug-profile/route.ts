
import { NextResponse } from 'next/server'

// Minimal debug profile route used only for local/dev diagnostics.
// Export a GET handler so Next's app-route loader treats this file as a proper module.
export async function GET() {
	return NextResponse.json({ ok: true, message: 'debug-profile route active' })
}
