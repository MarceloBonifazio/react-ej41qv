const payload = [
	{
		"region": "Sudeste",
		"states": [
			{
				"code": "SP",
				"name": "São Paulo",
				"cities": [
					{
						"code": 1,
						"name": "Santo André",
						"branches": [
							{
								"code": 120,
								"name": "Grand Plaza I"
							},
							{
								"code": 125,
								"name": "Grand Plaza II"
							},
							{
								"code": 1002,
								"name": "Agência Interna"
							}
						]
					},
					{
						"code": 3,
						"name": "São Caetano do Sul",
						"branches": [
							{
								"code": 1400,
								"name": "São Caetano do Sul I"
							}
						]
					}
				]
			}
		]
	},
	{
		"region": "Sul",
		"states": [
			{
				"code": "RS",
				"name": "Rio Grande do Sul",
				"cities": [
					{
						"code": 2,
						"name": "Gramado",
						"branches": [
							{
								"code": 1003,
								"name": "Gramado I"
							},
							{
								"code": 1004,
								"name": "Gramado II"
							}
						]
					}
				]
			}
		]
	}
]

export default payload;