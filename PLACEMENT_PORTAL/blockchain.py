""" first block of the blockchain"""
genesis_block ={
	'previous_hash':'',
	'index':0,
	'transaction':[]
}
blockchain = [genesis_block]
open_transactions = []
"""owner of the blockchain"""
owner="Smriti"
participants={'Smriri'}

def calculate_hash(block):
	return '.'.join([str(block[key]) for key in block])

def mine_block():
	last_block = blockchain[-1]
	previous_hash = calculate_hash(last_block)
	block = {
	'previous hash': previous_hash,
	'index': len(blockchain),
	'transactions' : open_transactions
	}
	blockchain.append(block)


def verify_blockchain():
	for index in range(1,len(blockchain)):
		if blockchain[index]['previous_hash'] != calculate_hash(blockchain[index-1]):
			return False
		else:
			return True



"""all the default arguments are put at last"""
def add_trasaction(receiver,sender=owner,amount=1.0):
	"""
	  sender:sender of the coins
	  recepient:recepient of the coins
	  amount:amount to be sent
	"""
	transaction = {
	  'sender':sender,
	  'receiver':receiver,
	  'amount':amount
	}
	open_transactions.append(transaction)
	participants.add(receiver)

def get_transaction():
	tx_recepient = input("Enter the name of the recepient")
	tx_amount = float(input("Enter the amount"))
	return tx_amount,tx_recepient


while True:
	print('please choose')
	print('1: Add new transation')
	print('2: Output the blockchain')
	print('3: Output all the participants')
	print('q:quit')
	choice = int(input("Enter your choice\n"))
	if(choice==1):
		amount, recepient = get_transaction()
		"""kwargs"""
		add_trasaction(recepient,amount=amount)
	elif(choice==2):
		pass
    elif(choice==3):
    	print(participants)
	else:
		break


