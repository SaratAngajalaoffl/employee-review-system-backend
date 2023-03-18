import bcrypt from 'bcryptjs'

export const generateHash = (password) => {
	const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS)

	return new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) reject(err.message)

			console.log({ hash })

			resolve(hash)
		})
	})
}

export const verifyHash = (password, hash) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, result) => {
			if (err) reject(err.message)
			resolve(result)
		})
	})
}

