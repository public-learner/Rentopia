let router = require('koa-router')()

const getUserDocs = async (ctx, tenantOrLandlord, isLandlord = false, property_id) => {
	// this COULD be simplified to be one unified doc retrieval function based on user.isLandlord
	let docRows, output
	output = {}
	// get the tenant documents where user_id contains the user's active tenant record's id
	if(isLandlord) {
		docRows = await ctx.db.query(`SELECT * FROM documents WHERE tenant_id = ${tenantOrLandlord.landlord_id};`)
		output.allLandlordDocs = docRows.rows
	} else {
		docRows = await ctx.db.query(`SELECT * FROM documents WHERE tenant_id = ${tenantOrLandlord.tenant_id};`)
		output.tenantDocs = docRows.rows
	}

	if(tenantOrLandlord.property_id) {
		// this returns all property-wide documents that are not tied to individual tenants
		docRows = await ctx.db.query(`SELECT * FROM documents WHERE property_id = ${tenantOrLandlord.property_id} AND tenant_id IS NULL;`)
		output.propertyDocs = docRows.rows
	}
	
	return output // returns the array of results
}

module.exports = {
	routes: router,
	getUserDocs: getUserDocs,
}