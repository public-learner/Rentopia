let router = require('koa-router')()

const getTenantDocs = async (ctx, tenant) => {
	// this COULD be simplified to be one unified doc retrieval function based on user.isLandlord
	let docRows, output

	// get the tenant documents where tenant_id contains the user's active tenant record's id
	docRows = await ctx.db.query(`SELECT * FROM documents WHERE tenant_id = ${tenant.tenant_id};`)
	output.tenantDocs = docRows.rows

	if(tenant.property_id) {
		// this returns all property-wide documents that are not tied to individual tenants
		docRows = await ctx.db.query(`SELECT * FROM documents WHERE property_id = ${tenant.property_id} AND tenant_id IS NULL;`)
		output.propertyDocs = docRows.rows
	}
	
	return output // returns the array of results
}

module.exports = {
	routes: router,
	getTenantDocs: getTenantDocs,
}