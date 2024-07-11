package org.commonground.ps.backendapi.core;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.commonground.ps.backendapi.exception.BadRequestException;
import org.commonground.ps.backendapi.jpa.entities.OrderEntity;
import org.commonground.ps.backendapi.jpa.entities.OrderNoteEntity;
import org.commonground.ps.backendapi.jpa.entities.UserEntity;

import org.commonground.ps.backendapi.jpa.repositories.OrderNoteRepository;
import org.commonground.ps.backendapi.jpa.repositories.OrderRepository;
import org.commonground.ps.backendapi.jpa.repositories.UserRepository;
import org.commonground.ps.backendapi.model.Order;
import org.commonground.ps.backendapi.model.OrderNote;
import org.commonground.ps.backendapi.model.User;
import org.springframework.stereotype.Service;

@Service
public class OrderNoteServiceImpl implements OrderNoteService {

	private final OrderService orderService;
	private final UserRepository userRepository;
	private final OrderNoteRepository orderNoteRepository;

	public OrderNoteServiceImpl(
			OrderService orderService,
			OrderNoteRepository orderNoteRepository,
			UserRepository userRepository) {
		this.userRepository = userRepository;
		this.orderService = orderService;
		this.orderNoteRepository = orderNoteRepository;

	}

	@Override
	public OrderNoteEntity createOrderNoteEntity(String content, UserEntity userEntity) {
		OrderNoteEntity orderNoteEntity = new OrderNoteEntity();
		orderNoteEntity.setId(UUID.randomUUID());
		orderNoteEntity.setContent(content);
		orderNoteEntity.setUser(userEntity);
		orderNoteEntity.setDateCreated(new Date());
		return orderNoteEntity;
	}

	@Override
	public Optional<OrderNoteEntity> save(OrderEntity orderEntity, String content, User user, boolean definite) {
		if (user == null) {
			return Optional.empty();
		}
		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			return Optional.empty();
		}

		OrderNoteEntity orderNoteEntity = createOrderNoteEntity(content, userEntityOptional.get());
		
		orderNoteEntity.setOrder(orderEntity);

		return Optional.of(orderNoteRepository.save(orderNoteEntity));
	}

	@Override
	public void saveNew(Order order, User user, boolean definite) throws BadRequestException {

		Optional<OrderEntity> orderEntityOptional = orderService.getOrderEntityById(user, order.getId());

		if (orderEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}
		OrderEntity orderEntity = orderEntityOptional.get();
		
		if (user == null) {
			throw new BadRequestException();
		}

		Optional<UserEntity> userEntityOptional = userRepository.getUserById(user.getDomain().getId(), user.getId());
		if (userEntityOptional.isEmpty()) {
			throw new BadRequestException();
		}
		UserEntity userEntity = userEntityOptional.get();

		if (order.getNotes() == null || order.getNotes().isEmpty()) {
			return;
		}
		System.out.println("Ik ben hier");
		// Select all new and indefinite notes
		List<OrderNote> orderNotes = order.getNotes().stream().filter(
					note -> note.getId() == null 
					|| !note.getDefinite()).collect(Collectors.toList());

		if (orderNotes.isEmpty()) {
			return;
		}
		System.out.println("Ik ben hier: " + orderNotes.size());
		for (OrderNote orderNote : orderNotes) {
			if (orderNote.getId() != null) {
				Optional<OrderNoteEntity> orderNoteEntityOptional = orderEntity.getOrderNote().stream().filter(noteEntity -> noteEntity.getId().equals(orderNote.getId())).findFirst();
				if (orderNoteEntityOptional.isPresent()) {
					OrderNoteEntity orderNoteEntity = orderNoteEntityOptional.get();
					System.out.println("A Ik ben hier: " + orderNoteEntity.getId());
					orderNoteEntity.setContent(orderNote.getContent());
					orderNoteEntity.setUser(userEntity);
					orderNoteEntity.setDefinite(definite);

					orderNoteRepository.save(orderNoteEntity);
				}
			} else {
				// OrderNoteEntity orderNoteEntity = createOrderNoteEntity(orderNote.getContent(), userEntityOptional.get());
				OrderNoteEntity orderNoteEntity = new OrderNoteEntity();
				orderNoteEntity.setId(UUID.randomUUID());
				orderNoteEntity.setContent(orderNote.getContent());
				orderNoteEntity.setUser(userEntity);
				orderNoteEntity.setDateCreated(new Date());
				
				orderNoteEntity.setDefinite(definite);
				orderNoteEntity.setOrder(orderEntity);
				// orderEntity.getOrderNote().add(orderNoteEntity);
				System.out.println("B Ik ben hier: " + orderNoteEntity.getId());
				orderNoteRepository.save(orderNoteEntity);
				System.out.println("C Ik ben hier: " + orderNoteEntity.getId());
			}
		}
		System.out.println("D Ik ben hier: ");
		orderNoteRepository.flush();
	}
}
